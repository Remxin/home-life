package db

import (
	"context"
	"database/sql"
)

type Store interface {
	Querier
	CreateUserTx(ctx context.Context, arg CreateUserTxParams) (CreateUserTxResult, error)
	VerifyUserTx(ctx context.Context, arg VerifyEmailTxParams) (VerifyEmailTxResult, error)
	CreateFamilyTx(ctx context.Context, arg CreateFamilyTxParams) (CreateFamilyTxResult, error)
	AddUserToFamilyTx(ctx context.Context, arg AddUserToFamilyTxParams) (AddUserToFamilyTxResult, error)
}

type SQLStore struct {
	*Queries
	db *sql.DB
}

// creates new store
func NewStore(db *sql.DB) Store {
	return &SQLStore{
		db:      db,
		Queries: New(db),
	}
}
