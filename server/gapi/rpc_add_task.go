package gapi

import (
	"context"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/google/uuid"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) AddTask(ctx context.Context, req *pb.AddTaskRequest) (*pb.AddTaskResponse, error) {
	violations := validateAddTaskRequest(req)
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

	if !userPermissions.CanCreate {
		return nil, status.Error(codes.PermissionDenied, "cannot add a task: need create permissions")
	}

	userID, err := uuid.Parse(userPermissions.UserId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot parse user_id UUID: %s", err)
	}
	assigned, err := uuid.Parse(req.AssignedTo)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot parse assigned_to UUID: %s", err)
	}

	var assignedTo uuid.NullUUID
	if len(req.AssignedTo) == 0 {
		assignedTo = uuid.NullUUID{
			Valid: false,
		}
	} else {
		assignedTo = uuid.NullUUID{
			Valid: true,
			UUID:  assigned,
		}
	}

	task, err := server.store.AddTask(ctx, db.AddTaskParams{
		Name:          req.Name,
		Description:   req.Description,
		FamilyID:      userPermissions.FamilyID,
		CreatedBy:     userID,
		AssignedTo:    assignedTo,
		ExecutionDate: req.ExecutionDate.AsTime(),
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to add new task: %s", err)
	}

	res := &pb.AddTaskResponse{
		Task: convertTask(task),
	}

	return res, nil
}

func validateAddTaskRequest(req *pb.AddTaskRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateString(req.Name, 3, 50); err != nil {
		violations = append(violations, fieldViolation("name", err))
	}

	if err := val.ValidateString(req.Description, 0, 150); err != nil {
		violations = append(violations, fieldViolation("description", err))
	}

	return violations
}
