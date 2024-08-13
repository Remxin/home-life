package gapi

import (
	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// import

func convertUser(user db.User) *pb.User {
	return &pb.User{
		Id:                user.ID.String(),
		Name:              user.FullName,
		Email:             user.Email,
		PasswordChangedAt: timestamppb.New(user.PasswordChangedAt),
		CreatedAt:         timestamppb.New(user.CreatedAt),
	}
}
