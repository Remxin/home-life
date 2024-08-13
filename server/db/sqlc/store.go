package db

import (
	"context"
	"database/sql"
)

type Store interface {
	Querier
	CreateUserTx(ctx context.Context, arg CreateUserTxParams) (CreateUserTxResult, error)
	VerifyUserTx(ctx context.Context, arg VerifyEmailTxParams) (VerifyEmailTxResult, error)
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
