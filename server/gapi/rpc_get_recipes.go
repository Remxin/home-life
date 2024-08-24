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

func (server *Server) GetRecipes(ctx context.Context, req *pb.GetRecipesRequest) (*pb.GetRecipesResponse, error) {
	violations := validateGetRecipesRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}
	tokenPayload, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user not authenticated: %s", err)
	}

	userPermissions, err := server.getPermissions(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user permissions error: %s", err)
	}

	if tokenPayload.UserId != userPermissions.UserId {
		return nil, status.Errorf(codes.Unauthenticated, "wrong user permissions token")
	}
	familyID := uuid.NullUUID{
		Valid: false,
		UUID:  uuid.Nil,
	}
	var public sql.NullBool
	var title sql.NullString
	if req.Search == pb.Search_PUBLIC {
		public = sql.NullBool{
			Valid: true,
			Bool:  true,
		}
	} else if req.Search == pb.Search_PRIVATE {
		public = sql.NullBool{
			Valid: true,
			Bool:  false,
		}
	} else if req.Search == pb.Search_FAMILY {
		familyID = uuid.NullUUID{
			Valid: true,
			UUID:  userPermissions.FamilyID,
		}
		public = sql.NullBool{
			Valid: false,
			Bool:  false,
		}

	} else {
		return nil, status.Errorf(codes.InvalidArgument, "unknown search type")
	}

	if req.Title != nil {
		title = sql.NullString{
			Valid:  true,
			String: req.GetTitle(),
		}
	} else {
		title = sql.NullString{
			Valid:  false,
			String: "",
		}
	}

	recipes, err := server.store.GetRecipes(ctx, db.GetRecipesParams{
		FamilyID: familyID,
		Public:   public,
		Title:    title,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "error while getting recipes: %s", err)
	}

	var pbRecipes []*pb.Recipe
	for _, recipe := range recipes {
		pbRecipes = append(pbRecipes, convertRecipe(recipe))
	}

	res := &pb.GetRecipesResponse{
		Recipes: pbRecipes,
	}

	return res, nil
}

func validateGetRecipesRequest(req *pb.GetRecipesRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateString(req.Search.Enum().String(), 3, 10); err != nil {
		violations = append(violations, fieldViolation("search", err))
	}

	if req.Title != nil {
		if err := val.ValidateString(req.GetTitle(), 2, 80); err != nil {
			violations = append(violations, fieldViolation("title", err))
		}
	}

	return violations
}
