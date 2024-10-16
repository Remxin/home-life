package gapi

import (
	"context"
	"database/sql"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/Remxin/home-life/server/utils"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/lib/pq"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (server *Server) LoginUser(ctx context.Context, req *pb.LoginUserRequest) (*pb.LoginUserResponse, error) {
	violations := validateLoginUserRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	user, err := server.store.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "no_data":
				return nil, status.Errorf(codes.NotFound, "user not found")
			}
		}
		return nil, status.Errorf(codes.Internal, "cannot find user")
	}
	err = utils.ComparePassword(req.Password, user.HashedPassword)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "wrong password")
	}
	// check if user has max number of sessions
	sessionCount, err := server.store.GetUserSessionsCount(ctx, user.ID)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get user sessions")
	}

	if sessionCount >= int64(server.config.MaxUserSessions) {
		_, err := server.store.DeleteOldestUserSession(ctx, user.ID)
		if err != nil {
			return nil, status.Error(codes.Internal, "cannot delete old user sessions")
		}
	}

	accessToken, accessTokenPayload, err := server.tokenMaker.CreateToken(user.ID.String(), server.config.AccessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user access token")
	}

	refreshToken, refreshTokenPayload, err := server.tokenMaker.CreateToken(user.ID.String(), server.config.RefreshTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user refresh token")
	}

	metadata := server.extractMetadata(ctx)
	session, err := server.store.CreateSession(ctx, db.CreateSessionParams{
		ID:           refreshTokenPayload.ID,
		UserID:       user.ID,
		RefreshToken: refreshToken,
		UserAgent:    metadata.UserAgent,
		ClientIp:     metadata.ClientIP,
		ExpiresAt:    refreshTokenPayload.ExpiredAt,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user session")
	}

	res := &pb.LoginUserResponse{
		User:                  convertUser(user),
		SessionId:             session.ID.String(),
		AccessToken:           accessToken,
		RefreshToken:          refreshToken,
		AccessTokenExpiresAt:  timestamppb.New(accessTokenPayload.ExpiredAt),
		RefreshTokenExpiresAt: timestamppb.New(refreshTokenPayload.ExpiredAt),
		PermissionsToken:      nil,
	}

	permissions, err := server.store.GetPermissions(ctx, user.ID)
	if err != nil {
		if err != sql.ErrNoRows {
			return nil, status.Errorf(codes.Internal, "cannot get user permissions: %s", err)
		} else {
			return res, nil
		}
	}

	permission_token, _, err := server.tokenMaker.CreatePermissionToken(user.ID.String(), permissions.ID.String(), server.config.AccessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot create user's permission token: %s", err)
	}
	res.PermissionsToken = &permission_token
	return res, nil
}

func validateLoginUserRequest(req *pb.LoginUserRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateEmail(req.Email); err != nil {
		violations = append(violations, fieldViolation("email", err))
	}

	if err := val.ValidatePassword(req.Password); err != nil {
		violations = append(violations, fieldViolation("password", err))
	}

	return violations
}
