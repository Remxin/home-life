package gapi

import (
	"context"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) GetTasks(ctx context.Context, req *pb.GetTasksRequest) (*pb.GetTasksResponse, error) {
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

	if !userPermissions.CanRead {
		return nil, status.Error(codes.PermissionDenied, "cannot get tasks: need read permissions")
	}
	var assignedTo uuid.NullUUID
	if req.SearchBy == pb.SearchBy_ASSIGNED_TO {
		userID, err := uuid.Parse(tokenPayload.UserId)
		if err != nil {
			return nil, status.Errorf(codes.InvalidArgument, "user_id is not valid")
		}
		assignedTo = uuid.NullUUID{
			UUID:  userID,
			Valid: true,
		}

	} else if req.SearchBy == pb.SearchBy_FAMILY_ID {
		assignedTo = uuid.NullUUID{
			UUID:  uuid.Nil,
			Valid: false,
		}
	} else {
		return nil, status.Errorf(codes.InvalidArgument, "search_by method not allowed")
	}

	tasks, err := server.store.GetTasks(ctx, db.GetTasksParams{
		FamilyID:   userPermissions.FamilyID,
		AssignedTo: assignedTo,
		DateFrom:   req.DateFrom.AsTime(),
		DateTo:     req.DateTo.AsTime(),
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get tasks: %s", err)
	}

	var pbTasks []*pb.Task
	for _, task := range tasks {
		pbTasks = append(pbTasks, convertTask(task))
	}
	res := &pb.GetTasksResponse{
		Tasks: pbTasks,
	}

	return res, nil
}
