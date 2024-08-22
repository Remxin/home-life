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

func (server *Server) CreateRecipe(ctx context.Context, req *pb.CreateRecipeRequest) (*pb.CreateRecipeResponse, error) {
	violations := validateCreateRecipeRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user not authenticated: %s", err)
	}
	createdBy, err := uuid.Parse(tokenPayload.UserId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "created_by is not a valid UUID")
	}

	recipe, err := server.store.CreateRecipe(ctx, db.CreateRecipeParams{
		Title:       req.Title,
		CreatedBy:   createdBy,
		Description: req.Description,
		Public:      req.Public,
		IframeLink:  req.IframeLink,
		ImageLink:   req.ImageLink,
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create a recipe: %s", err)
	}

	res := &pb.CreateRecipeResponse{
		Recipe: convertRecipe(recipe),
	}
	return res, nil
}

func validateCreateRecipeRequest(req *pb.CreateRecipeRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateString(req.Description, 0, 250); err != nil {
		violations = append(violations, fieldViolation("description", err))
	}
	if err := val.ValidateString(req.Title, 0, 80); err != nil {
		violations = append(violations, fieldViolation("title", err))
	}

	if err := val.ValidateString(req.IframeLink, 0, 120); err != nil {
		violations = append(violations, fieldViolation("iframe_link", err))
	}

	if err := val.ValidateString(req.ImageLink, 0, 120); err != nil {
		violations = append(violations, fieldViolation("image_link", err))
	}

	return violations
}
