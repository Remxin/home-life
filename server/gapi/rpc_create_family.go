package gapi

import (
	"context"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/lib/pq"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) CreateFamily(ctx context.Context, req *pb.CreateFamilyRequest) (*pb.CreateFamilyResponse, error) {
	violations := validateCreateFamilyRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user not authenticated: %s", err)
	}

	txResult, err := server.store.CreateFamilyTx(ctx, db.CreateFamilyTxParams{
		UserID:     tokenPayload.UserId,
		FamilyName: req.FamilyName,
	})

	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return nil, status.Errorf(codes.AlreadyExists, "family already exists: %s", err)
			}
		}
		return nil, status.Errorf(codes.Internal, "failed to create family: %s", err)
	}
	permissionToken, _, err := server.tokenMaker.CreatePermissionToken(tokenPayload.UserId, txResult.Permission.ID.String(), server.config.AccessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot create permission token")
	}

	res := &pb.CreateFamilyResponse{
		Family:          convertFamily(txResult.Family),
		PermissionToken: permissionToken,
	}
	return res, nil
}

func validateCreateFamilyRequest(req *pb.CreateFamilyRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateString(req.FamilyName, 3, 40); err != nil {
		violations = append(violations, fieldViolation("name", err))
	}

	return violations
}
