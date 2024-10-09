package worker

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
	"github.com/hibiken/asynq"
	"github.com/rs/zerolog/log"
)

const TaskInvitationEmail = "task:send_invitation_email"

type PayloadInvitationEmail struct {
	UserID                uuid.UUID `json:"user_id"`
	FamilyID              uuid.UUID `json:"family_id"`
	FamilyInvitationToken string    `json:"family_invitation_token"`
}

func (distributor *RedisTaskDistributor) DistibuteTaskInvitationEmail(
	ctx context.Context,
	payload *PayloadInvitationEmail,
	opts ...asynq.Option,
) error {
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal task json: %w", err)
	}

	task := asynq.NewTask(TaskInvitationEmail, jsonPayload, opts...)
	info, err := distributor.client.EnqueueContext(ctx, task)
	if err != nil {
		return fmt.Errorf("failed to enqueue task: %w", err)
	}
	log.Info().Str("type", task.Type()).
		Bytes("payload", task.Payload()).
		Str("queue", info.Queue).
		Int("max-retry", info.MaxRetry).
		Msg("enqueued task")

	return nil
}

func (processor *RedisTaskProcessor) ProcessTaskInvitationEmail(ctx context.Context, task *asynq.Task) error {
	var payload PayloadInvitationEmail
	if err := json.Unmarshal(task.Payload(), &payload); err != nil {
		return fmt.Errorf("failed to unmarshal payload: %w", asynq.SkipRetry)
	}

	user, err := processor.store.GetUserById(ctx, payload.UserID)
	if err != nil {
		return fmt.Errorf("failed to get user: %w", err)
	}

	family, err := processor.store.GetFamily(ctx, payload.FamilyID)
	if err != nil {
		return fmt.Errorf("failed to get family: %w", err)
	}

	subject := "Welcome to Home Life"
	verifyUrl := fmt.Sprintf("http://localhost:8080/v1/join_family?user_id=%s&code=%s", user.ID, payload.FamilyInvitationToken)
	content := fmt.Sprintf(`
		<h1>Hi %s</h1>
		<p>You have been invited to family <span>%s</span></p>
		<p>To join it <a href="%s">click here</a></p>

	`, user.FullName, family.Name, verifyUrl)
	to := []string{user.Email}

	err = processor.mailer.SendEmail(subject, content, to, nil, nil, nil)
	if err != nil {
		return fmt.Errorf("failed to send verify email to user %s: %w", user.Email, err)
	}
	log.Info().
		Str("type", task.Type()).
		Bytes("payload", task.Payload()).
		Str("email", user.Email).
		Msg("processed task")

	return nil
}
