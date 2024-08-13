package worker

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/utils"
	"github.com/google/uuid"
	"github.com/hibiken/asynq"
	"github.com/rs/zerolog/log"
)

const TaskVerifyEmail = "task:send_verify_email"

type PayloadVerifyEmail struct {
	ID uuid.UUID `json:"id"`
}

func (distributor *RedisTaskDistributor) DistibuteTaskVerifyEmail(
	ctx context.Context,
	payload *PayloadVerifyEmail,
	opts ...asynq.Option,
) error {
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal task json: %w", err)
	}

	task := asynq.NewTask(TaskVerifyEmail, jsonPayload, opts...)
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

func (processor *RedisTaskProcessor) ProcessTaskVerifyEmail(ctx context.Context, task *asynq.Task) error {
	var payload PayloadVerifyEmail
	if err := json.Unmarshal(task.Payload(), &payload); err != nil {
		return fmt.Errorf("failed to unmarshal payload: %w", asynq.SkipRetry)
	}

	user, err := processor.store.GetUser(ctx, payload.ID)
	if err != nil {
		return fmt.Errorf("failed to get user: %w", err)
	}
	verifyEmail, err := processor.store.CreateVerifyEmail(ctx, db.CreateVerifyEmailParams{
		UserID: user.ID,
		Email: user.Email,
		SecretCode: utils.RandomString(32),
		ExpiredAt: time.Now().Add(15 * time.Minute),
	})

	if err != nil {
		return fmt.Errorf("cannot create user verify email: %w", err)
	}

	subject := "Welcome to Home Life"
	verifyUrl := fmt.Sprintf("http://localhost:8080/v1/verify_email?email_id=%d&secret_code=%s", verifyEmail.ID, verifyEmail.SecretCode)
	content := fmt.Sprintf(`
		<h1>Hi %s</h1>
		<p>Thank you for joining us</p>
		<p>To end up registration please <a href="%s">verify your email address</a></p>

	`, user.FullName, verifyUrl)
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