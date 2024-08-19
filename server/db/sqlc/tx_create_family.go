package db

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

type CreateFamilyTxParams struct {
	UserID     string
	FamilyName string
}

type CreateFamilyTxResult struct {
	Family     Family
	Permission Permission
}

func (store *SQLStore) CreateFamilyTx(ctx context.Context, arg CreateFamilyTxParams) (CreateFamilyTxResult, error) {
	var result CreateFamilyTxResult

	err := store.execTx(ctx, func(queries *Queries) error {
		var err error
		UserID, err := uuid.Parse(arg.UserID)
		if err != nil {
			return fmt.Errorf("error in UserID conversion to UUID: %w", err)
		}

		result.Family, err = queries.CreateFamily(ctx, CreateFamilyParams{
			Name:    arg.FamilyName,
			OwnerID: UserID,
		})
		if err != nil {
			return fmt.Errorf("cannot create family: %w", err)
		}

		_, err = queries.AddUserToFamily(ctx, AddUserToFamilyParams{
			UserID: UserID,
			FamilyID: uuid.NullUUID{
				UUID:  result.Family.ID,
				Valid: true,
			},
		})
		if err != nil {
			return fmt.Errorf("cannot update user's family: %w", err)
		}

		result.Permission, err = queries.CreatePermissions(ctx, CreatePermissionsParams{
			ID:        UserID,
			CanRead:   true,
			CanEdit:   true,
			CanCreate: true,
			CanModify: true,
		})
		return err
	})
	return result, err
}
