package db

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

type VerifyEmailTxParams struct {
	EmailId    string
	SecretCode string
}

type VerifyEmailTxResult struct {
	User        User
	VerifyEmail VerifyEmail
}

func (store *SQLStore) VerifyUserTx(ctx context.Context, arg VerifyEmailTxParams) (VerifyEmailTxResult, error) {
	var result VerifyEmailTxResult

	err := store.execTx(ctx, func(queries *Queries) error {
		var err error
		emailId, err := uuid.Parse(arg.EmailId)
		if err != nil {
			return fmt.Errorf("error in emailId conversion from string to uuid: %w", err)
		}

		result.VerifyEmail, err = queries.UpdateVerifyEmail(ctx, UpdateVerifyEmailParams{
			ID:         emailId,
			SecretCode: arg.SecretCode,
		})
		if err != nil {
			return fmt.Errorf("cannot update verify email: %w", err)
		}

		result.User, err = queries.UpdateUser(ctx, UpdateUserParams{
			ID: result.VerifyEmail.UserID,
			IsVerified: sql.NullBool{
				Bool:  true,
				Valid: true,
			},
		})
		return err
	})
	return result, err
}
