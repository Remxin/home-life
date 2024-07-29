package gapi

import (
	"fmt"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/Remxin/home-life/server/token"
	"github.com/Remxin/home-life/server/util"

	_ "github.com/lib/pq"
)

type Server struct {
	pb.UnimplementedHomeLifeServer
	config util.Config
	store db.Store
	tokenMaker token.Maker
}

func NewServer (config util.Config, store db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		config: config,
		store: store,
		tokenMaker: tokenMaker,
	}
	


	return server, nil
}