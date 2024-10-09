package worker

import (
	"context"

	"github.com/hibiken/asynq"
)

type TaskDistributor interface {
	DistibuteTaskVerifyEmail(
		ctx context.Context,
		payload *PayloadVerifyEmail,
		opts ...asynq.Option,
	) error
	DistibuteTaskInvitationEmail(
		ctx context.Context,
		payload *PayloadInvitationEmail,
		opts ...asynq.Option,
	) error
}

type RedisTaskDistributor struct {
	client *asynq.Client
}

func NewRedisTaskDistributor(redisOpt asynq.RedisClientOpt) TaskDistributor {
	client := asynq.NewClient(redisOpt)
	return &RedisTaskDistributor{
		client: client,
	}
}
