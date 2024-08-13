package gapi

import (
	"fmt"

	db "github.com/Remxin/home-life/server/db/sqlc"
	"github.com/Remxin/home-life/server/pb"
	"github.com/Remxin/home-life/server/token"
	"github.com/Remxin/home-life/server/utils"
	"github.com/Remxin/home-life/server/worker"

	_ "github.com/lib/pq"
)

type Server struct {
	pb.UnimplementedHomeLifeServer
	config utils.Config
	store db.Store
	tokenMaker token.Maker
	taskDistributor worker.TaskDistributor
}

func NewServer (config utils.Config, store db.Store, taskDistributor worker.TaskDistributor) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		config: config,
		store: store,
		tokenMaker: tokenMaker,
		taskDistributor: taskDistributor,
	}
	
	return server, nil
}