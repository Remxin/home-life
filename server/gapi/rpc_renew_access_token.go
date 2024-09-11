package gapi

import (
	"context"
	"database/sql"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (server *Server) RenewAccessToken(ctx context.Context, req *emptypb.Empty) (*pb.RenewAccessTokenResponse, error) {
	previousTokenPayload, err := server.getRefreshToken(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user refresh token not valid: %s", err)
	}

	err = server.compareSessionData(ctx, previousTokenPayload)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "session data does not match: %s", err)
	}

	accessToken, accessTokenPayload, err := server.tokenMaker.CreateToken(previousTokenPayload.UserId, server.config.AccessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user access token")
	}

	refreshToken, refreshTokenPayload, err := server.tokenMaker.CreateToken(previousTokenPayload.UserId, server.config.RefreshTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user refresh token")
	}

	userID, err := uuid.Parse(refreshTokenPayload.UserId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "failed to parse user_id to UUID")
	}

	permissions, err := server.store.GetPermissions(ctx, userID)
	var permissionToken string
	if err != nil {
		if err != sql.ErrNoRows {
			return nil, status.Errorf(codes.Internal, "cannot get user permissions: %s", err)
		}
	} else {
		permissionToken, _, err = server.tokenMaker.CreatePermissionToken(refreshTokenPayload.UserId, permissions.ID.String(), server.config.AccessTokenDuration)
		if err != nil {
			return nil, status.Errorf(codes.Internal, "cannot create permission token")
		}
	}

	session, err := server.store.UpdateUserSession(ctx, db.UpdateUserSessionParams{
		RefreshToken: refreshToken,
		ExpiresAt:    refreshTokenPayload.ExpiredAt,
		ID:           previousTokenPayload.ID,
		NewID:        refreshTokenPayload.ID,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to update user session: %s", err)
	}

	res := &pb.RenewAccessTokenResponse{
		SessiondId:            session.ID.String(),
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  timestamppb.New(accessTokenPayload.ExpiredAt),
		RefreshToken:          session.RefreshToken,
		RefreshTokenExpiresAt: timestamppb.New(refreshTokenPayload.ExpiredAt),
		PermissionToken:       nil,
	}

	res.PermissionToken = &permissionToken

	return res, nil
}
