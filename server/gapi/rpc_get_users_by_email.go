package gapi

import (
	"context"
	"database/sql"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	val "github.com/Remxin/home-life/server/validations"
	"github.com/lib/pq"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *Server) GetUsersByEmail(ctx context.Context, req *pb.GetUsersByEmailRequest) (*pb.GetUsersByEmailResponse, error) {
	violations := validateGetUsersByEmailRequest(req)
	if violations != nil {
		return nil, invalidArgumentError(violations)
	}

	_, err := server.authorizeUser(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "user authentication error: %s", err)
	}

	users, err := server.store.GetUsersByEmail(ctx, db.GetUsersByEmailParams{
		Email: sql.NullString{
			Valid:  true,
			String: req.Email,
		},
		NoFamily: true,
	})
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "no_data":
				return nil, status.Error(codes.NotFound, "no user found")
			}
		}
		return nil, status.Error(codes.Internal, "cannot find users")
	}

	var pbUsers = []*pb.User{}
	for _, user := range users {
		pbUsers = append(pbUsers, convertUser(user))
	}

	res := &pb.GetUsersByEmailResponse{
		Users: pbUsers,
	}
	return res, nil
}

func validateGetUsersByEmailRequest(req *pb.GetUsersByEmailRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := val.ValidateString(req.Email, 3, 128); err != nil {
		violations = append(violations, fieldViolation("email", err))
	}

	return violations
}
