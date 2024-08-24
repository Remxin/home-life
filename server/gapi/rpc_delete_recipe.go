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

func (server *Server) DeleteRecipe(ctx context.Context, req *pb.DeleteRecipeRequest) (*pb.DeleteRecipeResponse, error) {
	violations := validateDeleteRecipeRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user not authenticated: %s", err)
	}
	recipeID, err := uuid.Parse(req.Id)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "created_by is not a valid UUID")
	}

	createdBy, err := uuid.Parse(tokenPayload.UserId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "created_by is not a valid UUID")
	}

	recipe, err := server.store.DeleteRecipe(ctx, db.DeleteRecipeParams{
		ID:        recipeID,
		CreatedBy: createdBy,
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to delete a recipe: %s", err)
	}

	res := &pb.DeleteRecipeResponse{
		Recipe: convertRecipe(recipe),
	}
	return res, nil
}

func validateDeleteRecipeRequest(req *pb.DeleteRecipeRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateUUID(req.Id); err != nil {
		violations = append(violations, fieldViolation("id", err))
	}
	return violations
}
