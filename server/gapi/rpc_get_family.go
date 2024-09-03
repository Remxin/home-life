package gapi

import (
	"context"

	"github.com/Remxin/home-life/server/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (server *Server) GetFamily(ctx context.Context, req *emptypb.Empty) (*pb.GetFamilyResponse, error) {
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

	family, err := server.store.GetFamily(ctx, userPermissions.FamilyID)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get user family details: %s", err)
	}

	family_members, err := server.store.GetMembers(ctx, userPermissions.FamilyID)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get family members: %s", err)
	}

	var members []*pb.User
	for _, member := range family_members {
		members = append(members, convertUser(member))
	}

	res := &pb.GetFamilyResponse{
		Family:  convertFamily(family),
		Members: members,
	}

	return res, nil
}
