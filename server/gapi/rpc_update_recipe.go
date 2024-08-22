package gapi

import (
	"context"
	"database/sql"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/google/uuid"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) UpdateRecipe(ctx context.Context, req *pb.UpdateRecipeRequest) (*pb.UpdateRecipeResponse, error) {
	violations := validateUpdateRecipeRequest(req)
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

	recipe, err := server.store.UpdateRecipe(ctx, db.UpdateRecipeParams{
		ID:        recipeID,
		CreatedBy: createdBy,
		Title: sql.NullString{
			String: req.GetTitle(),
			Valid:  req.Title != nil,
		},
		Description: sql.NullString{
			String: req.GetDescription(),
			Valid:  req.Description != nil,
		},
		Public: sql.NullBool{
			Bool:  req.GetPublic(),
			Valid: req.Public != nil,
		},
		IframeLink: sql.NullString{
			String: req.GetIframeLink(),
			Valid:  req.IframeLink != nil,
		},
		ImageLink: sql.NullString{
			String: req.GetImageLink(),
			Valid:  req.ImageLink != nil,
		},
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create a recipe: %s", err)
	}

	res := &pb.UpdateRecipeResponse{
		Recipe: convertRecipe(recipe),
	}
	return res, nil
}

func validateUpdateRecipeRequest(req *pb.UpdateRecipeRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if req.Description != nil {
		if err := val.ValidateString(req.GetDescription(), 0, 250); err != nil {
			violations = append(violations, fieldViolation("description", err))
		}
	}
	if req.Title != nil {
		if err := val.ValidateString(req.GetTitle(), 0, 80); err != nil {
			violations = append(violations, fieldViolation("title", err))
		}
	}
	if req.IframeLink != nil {
		if err := val.ValidateString(req.GetIframeLink(), 0, 120); err != nil {
			violations = append(violations, fieldViolation("iframe_link", err))
		}
	}

	if req.ImageLink != nil {
		if err := val.ValidateString(req.GetImageLink(), 0, 120); err != nil {
			violations = append(violations, fieldViolation("image_link", err))
		}
	}

	return violations
}
