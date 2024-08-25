package gapi

import (
	"context"
	"fmt"
	"strings"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/token"
	"github.com/google/uuid"
	"google.golang.org/grpc/metadata"
)

const (
	authorizationHeader = "authorization"
	authorizationBearer = "bearer"
	permission_token    = "permission_token"
	refresh_token       = "refresh_token"
)

func (server *Server) authorizeUser(ctx context.Context) (*token.Payload, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("could not receive request metadata")
	}

	values := md.Get(authorizationHeader)
	if len(values) == 0 {
		return nil, fmt.Errorf("missing authorization header")
	}

	authHeader := values[0]
	fields := strings.Fields(authHeader)
	if len(fields) < 2 {
		return nil, fmt.Errorf("invalid authorization header format")
	}

	authType := strings.ToLower(fields[0])
	if authType != authorizationBearer {
		return nil, fmt.Errorf("unsupported authorization header format: %s", authType)
	}

	accessToken := fields[1]
	payload, err := server.tokenMaker.VerifyToken(accessToken)
	if err != nil {
		return nil, fmt.Errorf("invalid access token: %w", err)
	}

	return payload, nil
}

type UserPermissions struct {
	*token.PermissionPayload
	*db.Permission
}

func (server *Server) getPermissions(ctx context.Context) (*UserPermissions, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("could not get request from context")
	}

	permissionTokenCookie := md[permission_token]
	if len(permissionTokenCookie) == 0 {
		return nil, fmt.Errorf("permission token not found")
	}

	tokenPayload, err := server.tokenMaker.VerifyPermissionToken(permissionTokenCookie[0])
	if err != nil {
		return nil, fmt.Errorf("permission token is not valid: %w", err)
	}

	userId, err := uuid.Parse(tokenPayload.UserId)
	if err != nil {
		return nil, fmt.Errorf("wrong permission token, failed to parse user_id: %w", err)
	}

	permissionsRecord, err := server.store.GetPermissions(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("failed to get user permissions: %w", err)
	}

	userPermissions := &UserPermissions{
		tokenPayload,
		&permissionsRecord,
	}

	return userPermissions, nil
}

func (server *Server) getRefreshToken(ctx context.Context) (*token.Payload, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("could not get request from context")
	}

	refresh_token := md[refresh_token]
	if len(refresh_token) == 0 {
		return nil, fmt.Errorf("refresh token not found")
	}

	tokenPayload, err := server.tokenMaker.VerifyToken(refresh_token[0])
	if err != nil {
		return nil, fmt.Errorf("refresh token is not valid: %w", err)
	}

	return tokenPayload, nil
}

func (server *Server) compareSessionData(ctx context.Context, payload *token.Payload) error {
	session, err := server.store.GetSession(ctx, payload.ID)
	if err != nil {
		return fmt.Errorf("cannot get user session: %w", err)
	}
	metadata := server.extractMetadata(ctx)
	if !compareClientIP(session.ClientIp, metadata.ClientIP) {
		return fmt.Errorf("wrong session: client_ips does not match")
	}

	if metadata.UserAgent != session.UserAgent {
		return fmt.Errorf("wrong session: user_agents does not match")
	}

	return nil
}

func compareClientIP(sessionIP, requestIP string) bool {
	if sessionIP == requestIP {
		return true
	}

	if len(sessionIP) > 0 && len(requestIP) > 0 {
		sessionIPParts := strings.Split(sessionIP, ".")
		requestIPParts := strings.Split(requestIP, ".")
		if len(sessionIPParts) >= 2 && len(requestIPParts) >= 2 &&
			sessionIPParts[0] == requestIPParts[0] &&
			sessionIPParts[1] == requestIPParts[1] {
			return true
		}
	}

	return false
}
