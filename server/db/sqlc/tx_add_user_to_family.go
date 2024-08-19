package db

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

type AddUserToFamilyTxParams struct {
	UserID    string
	FamilyID  string
	CanRead   bool
	CanEdit   bool
	CanCreate bool
	CanModify bool
}

type AddUserToFamilyTxResult struct {
	User       User
	Permission Permission
}

func (store *SQLStore) AddUserToFamilyTx(ctx context.Context, arg AddUserToFamilyTxParams) (AddUserToFamilyTxResult, error) {
	var result AddUserToFamilyTxResult

	err := store.execTx(ctx, func(queries *Queries) error {
		var err error
		UserID, err := uuid.Parse(arg.UserID)
		if err != nil {
			return fmt.Errorf("error in UserID conversion to UUID: %w", err)
		}
		FamilyID, err := uuid.Parse(arg.FamilyID)
		if err != nil {
			return fmt.Errorf("error in FamiliyID conversion to UUID: %w", err)
		}

		result.User, err = queries.AddUserToFamily(ctx, AddUserToFamilyParams{
			FamilyID: uuid.NullUUID{
				UUID:  FamilyID,
				Valid: true,
			},
			UserID: UserID,
		})
		if err != nil {
			return fmt.Errorf("cannot create family: %w", err)
		}

		result.Permission, err = queries.CreatePermissions(ctx, CreatePermissionsParams{
			ID:        UserID,
			CanRead:   arg.CanRead,
			CanEdit:   arg.CanEdit,
			CanCreate: arg.CanCreate,
			CanModify: arg.CanModify,
		})
		return err
	})
	return result, err
}
