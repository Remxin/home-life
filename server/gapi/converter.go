package gapi

import (
	"log"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// import

func convertUser(user db.User) *pb.User {

	userProto := &pb.User{
		Id:                user.ID.String(),
		Name:              user.FullName,
		Email:             user.Email,
		PasswordChangedAt: timestamppb.New(user.PasswordChangedAt),
		CreatedAt:         timestamppb.New(user.CreatedAt),
	}

	jsonString := protojson.Format(userProto)
	log.Printf("User Protobuf JSON: %s", jsonString)

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
