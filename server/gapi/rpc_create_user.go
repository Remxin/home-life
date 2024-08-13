package gapi

import (
	"context"
	"time"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/Remxin/home-life/server/utils"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/Remxin/home-life/server/worker"
	"github.com/hibiken/asynq"
	"github.com/lib/pq"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
	violations := validateCreateUserRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to hash password: %s", err)
	}
	user, err := server.store.CreateUserTx(ctx, db.CreateUserTxParams{
		CreateUserParams: db.CreateUserParams{
			Name: req.Name,
			Email: req.Email,
			Password: hashedPassword,
		},
		AfterCreate: func(user db.User) error {
			taskPayload := &worker.PayloadVerifyEmail{
				ID: user.ID,
			}
			opts := []asynq.Option{
				asynq.MaxRetry(10),
				asynq.Queue(worker.QueueDefault),
				asynq.ProcessIn(10 * time.Second),
			}
			return server.taskDistributor.DistibuteTaskVerifyEmail(ctx, taskPayload, opts...)
		},
		
	})

	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name(){
			case "unique_violation":
				return  nil, status.Errorf(codes.AlreadyExists, "username already exists: %s", err)
			}
		} 
		return  nil, status.Errorf(codes.Internal, "failed to create user: %s", err)
	}

	res := &pb.CreateUserResponse{
		User: convertUser(user.User),
	}
	return res, nil
}


func validateCreateUserRequest(req *pb.CreateUserRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUserName(req.Name); err != nil {
		violations = append(violations, fieldViolation("name", err))
	}

	if err := val.ValidateEmail(req.Email); err != nil {
		violations = append(violations, fieldViolation("email", err))
	}

	if err := val.ValidatePassword(req.Password); err != nil {
		violations = append(violations, fieldViolation("password", err))
	}

	return violations
}