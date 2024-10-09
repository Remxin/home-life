package gapi

import (
	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func convertUser(user db.User) *pb.User {
	userProto := &pb.User{
		Id:                user.ID.String(),
		Name:              user.FullName,
		Email:             user.Email,
		PasswordChangedAt: timestamppb.New(user.PasswordChangedAt),
		CreatedAt:         timestamppb.New(user.CreatedAt),
	}
	return userProto
}

func convertFamily(family db.Family) *pb.Family {
	return &pb.Family{
		Id:        family.ID.String(),
		Name:      family.Name,
		OwnerId:   family.OwnerID.String(),
		CreatedAt: timestamppb.New(family.CreatedAt),
	}
}

func convertPermission(permission db.Permission) *pb.Permissions {
	return &pb.Permissions{
		Id:        permission.ID.String(),
		FamilyId:  permission.FamilyID.String(),
		CanRead:   permission.CanRead,
		CanEdit:   permission.CanEdit,
		CanCreate: permission.CanCreate,
		CanModify: permission.CanModify,
	}
}

func convertTask(task db.Task) *pb.Task {
	return &pb.Task{
		Id:            task.ID.String(),
		Name:          task.Name,
		Description:   task.Description,
		Done:          task.Done,
		CreatedBy:     task.CreatedBy.String(),
		FamilyId:      task.FamilyID.String(),
		AssignedTo:    task.AssignedTo.UUID.String(),
		ExecutionDate: timestamppb.New(task.ExecutionDate),
		CreatedAt:     timestamppb.New(task.CreatedAt),
	}
}

func convertRecipe(recipe db.Recipe) *pb.Recipe {
	return &pb.Recipe{
		Id:          recipe.ID.String(),
		Title:       recipe.Title,
		Description: recipe.Description,
		Public:      recipe.Public,
		CreatedBy:   recipe.CreatedBy.String(),
		IframeLink:  recipe.IframeLink,
		ImageLink:   recipe.ImageLink,
		CreatedAt:   timestamppb.New(recipe.CreatedAt),
	}
}
