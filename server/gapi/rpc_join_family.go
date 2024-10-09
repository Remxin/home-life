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

func (server *Server) JoinFamily(ctx context.Context, req *pb.JoinFamilyRequest) (*pb.JoinFamilyResponse, error) {
	violations := validateJoinFamilyRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}

	payload, err := server.tokenMaker.VerifyFamilyInvitationToken(req.Code)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid invitation code: %s", err)
	}

	userID, err := uuid.Parse(payload.UserId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "cannot parse user_id")
	}

	familyID, err := uuid.Parse(payload.FamilyId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "cannot parse family_id")
	}

	server.store.CreatePermissions(ctx, db.CreatePermissionsParams{
		ID:        userID,
		FamilyID:  familyID,
		CanRead:   payload.CanRead,
		CanCreate: payload.CanCreate,
		CanEdit:   payload.CanEdit,
		CanModify: payload.CanModify,
	})

	res := &pb.JoinFamilyResponse{
		Success: true,
	}
	return res, nil
}

func validateJoinFamilyRequest(req *pb.JoinFamilyRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUUID(req.UserId); err != nil {
		violations = append(violations, fieldViolation("user_id", err))
	}

	if err := val.ValidateString(req.Code, 100, 500); err != nil {
		violations = append(violations, fieldViolation("code", err))
	}

	return violations
}
