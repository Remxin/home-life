package gapi

import (
	"context"

	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/google/uuid"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) MarkTaskAsDone(ctx context.Context, req *pb.MarkTaskAsDoneRequest) (*pb.MarkTaskAsDoneResponse, error) {
	violations := validateMarkTaskAsDoneRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user not authenticated: %s", err)
	}

	userPermissions, err := server.getPermissions(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user permissions error: %s", err)
	}

	if tokenPayload.UserId != userPermissions.UserId {
		return nil, status.Errorf(codes.Unauthenticated, "wrong user permissions token")
	}

	if !userPermissions.CanEdit {
		return nil, status.Error(codes.PermissionDenied, "cannot add a task: need create permissions")
	}

	taskID, err := uuid.Parse(req.TaskId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "cannot conver task_id to UUID")
	}

	task, err := server.store.MarkTaskAsDone(ctx, taskID)

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to add new task: %s", err)
	}

	res := &pb.MarkTaskAsDoneResponse{
		Task: convertTask(task),
	}

	return res, nil
}

func validateMarkTaskAsDoneRequest(req *pb.MarkTaskAsDoneRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUUID(req.TaskId); err != nil {
		violations = append(violations, fieldViolation("task_id", err))
	}

	return violations
}
