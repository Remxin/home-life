package gapi

import (
	"context"
	"time"

	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/Remxin/home-life/server/worker"
	"github.com/google/uuid"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) InviteUserToFamily(ctx context.Context, req *pb.InviteUserToFamilyRequest) (*pb.InviteUserToFamilyResponse, error) {
	violations := validateInviteUserToFamilyRequest(req)
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
		return nil, status.Error(codes.InvalidArgument, "wrong user_id")
	}

	if userID == tokenPayload.ID {
		return nil, status.Error(codes.InvalidArgument, "cannot add yourself to a family")
	}

	invitedUser, err := server.store.GetUserWithPermissions(ctx, userID)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "user not found")
	}

	if !invitedUser.IsVerified {
		return nil, status.Error(codes.InvalidArgument, "user is not verified")
	}

	if invitedUser.FamilyID.Valid {
		return nil, status.Error(codes.AlreadyExists, "user already has family")
	}

	invitationToken, _, err := server.tokenMaker.CreateFamilyInvitationToken(req.UserId, permissionPayload.FamilyID.String(), req.CanRead, req.CanCreate, req.CanEdit, req.CanModify, time.Minute*10)
	if err != nil {
		return nil, status.Error(codes.Internal, "cannot create family invitation token")
	}

	server.taskDistributor.DistibuteTaskInvitationEmail(ctx, &worker.PayloadInvitationEmail{
		UserID:                userID,
		FamilyID:              permissionPayload.FamilyID,
		FamilyInvitationToken: invitationToken,
	})
	res := &pb.InviteUserToFamilyResponse{
		Success: true,
	}
	return res, nil
}

func validateInviteUserToFamilyRequest(req *pb.InviteUserToFamilyRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUUID(req.UserId); err != nil {
		violations = append(violations, fieldViolation("user_id", err))
	}

	return violations
}
