package gapi

import (
	"context"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/google/uuid"
	"github.com/lib/pq"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) AddUserToFamily(ctx context.Context, req *pb.AddUserToFamilyRequest) (*pb.AddUserToFamilyResponse, error) {
	violations := validateAddUserToFamilyRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}

	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user authentication error: %s", err)
	}

	permissionPayload, err := server.getPermissions(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user permissions error: %s", err)
	}

	if tokenPayload.UserId != permissionPayload.UserId {
		return nil, status.Errorf(codes.Unauthenticated, "wrong user permissions token")
	}

	if !permissionPayload.CanModify {
		return nil, status.Error(codes.PermissionDenied, "cannot add member to a family: insufficient permissions")
	}
	userID, err := uuid.Parse(req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "failed to convert user_id to UUID")
	}

	permission, err := server.store.CreatePermissions(ctx, db.CreatePermissionsParams{
		ID:        userID,
		FamilyID:  permissionPayload.FamilyID,
		CanRead:   req.CanRead,
		CanEdit:   req.CanEdit,
		CanCreate: req.CanCreate,
		CanModify: req.CanModify,
	})

	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return nil, status.Errorf(codes.AlreadyExists, "user already has family: %s", err)
			}
		}
		return nil, status.Errorf(codes.Internal, "failed to to add user to family: %s", err)
	}
	res := &pb.AddUserToFamilyResponse{
		Permissions: convertPermission(permission),
	}
	return res, nil
}

func validateAddUserToFamilyRequest(req *pb.AddUserToFamilyRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUUID(req.UserId); err != nil {
		violations = append(violations, fieldViolation("user_id", err))
	}

	return violations
}
