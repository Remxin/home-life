package main

import (
	"context"
	"database/sql"
	"fmt"
	"net"
	"net/http"
	"os"

	db "github.com/Remxin/home-life/server/db/sqlc"
	_ "github.com/Remxin/home-life/server/doc/statik"
	gapi "github.com/Remxin/home-life/server/gapi"
	pb "github.com/Remxin/home-life/server/pb"
	"github.com/Remxin/home-life/server/utils"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	_ "github.com/mattes/migrate/source/file"
	"github.com/rakyll/statik/fs"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	config, err := utils.LoadConfig(".")
	if err != nil {
		log.Fatal().Msg("cannot load config: ")
	}

	if config.Environment == "development" {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal().Msg("cannot connect to database")
	}

	runDBMigration(config.MigrationURL, config.DBSource)
	store := db.NewStore(conn)
	go runGatewayServer(config, store)
	runGrcpServer(config, store)
}

func runGrcpServer(config utils.Config, store db.Store) {
	server, err := gapi.NewServer(config, store) 
	if err != nil {
		log.Fatal().Msg("cannot create server")
	}
	
	grpcLogger := grpc.UnaryInterceptor(gapi.GrpcLogger)
	grpcServer := grpc.NewServer(grpcLogger)
	pb.RegisterHomeLifeServer(grpcServer, server)
	reflection.Register(grpcServer)
	
	listener, err := net.Listen("tcp", config.GRPCServerAddress)
	if err != nil {
		log.Fatal().Msg("cannot create listener")
	}
	log.Info().Msgf("start gRPC server at %s", listener.Addr().String())
	err = grpcServer.Serve(listener)

	if err != nil {
		log.Fatal().Msg("cannot start gRPC server")
	}
}

func runGatewayServer(config utils.Config, store db.Store) {
	server, err := gapi.NewServer(config, store) 
	if err != nil {
		log.Fatal().Msg("cannot create server")
	}

	// enable snake case to make servers output consistent
	jsonOption := runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{
		MarshalOptions: protojson.MarshalOptions{
			UseProtoNames: true,
		},
		UnmarshalOptions: protojson.UnmarshalOptions{
			DiscardUnknown: true,
		},
	})
	
	grpcMux := runtime.NewServeMux(jsonOption)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	err = pb.RegisterHomeLifeHandlerServer(ctx, grpcMux, server)
	if err != nil {
		log.Fatal().Msg("could not register handler server")
	}

	mux := http.NewServeMux()
	mux.Handle("/", grpcMux)

	statikFS, err := fs.New()
	if err != nil {
		fmt.Println(err)
		log.Fatal().Msg("cannot create statik fs:")
	}
	swaggerHander := http.StripPrefix("/swagger/", http.FileServer(statikFS))
	mux.Handle("/swagger/", swaggerHander)
	
	listener, err := net.Listen("tcp", config.HTTPServerAddress)
	if err != nil {
		log.Fatal().Msg("cannot create listener")
	}
	log.Info().Msgf("start HTTP gateway server at %s", listener.Addr().String())

	handler := gapi.HttpLogger(mux)
	err = http.Serve(listener, handler)

	if err != nil {
		log.Fatal().Msg("cannot start HTTP gateway server")
	}
}

func runDBMigration(migrationURL string, dbSource string) {
	migration, err := migrate.New(migrationURL, dbSource)
	if err != nil {
		log.Fatal().Msg("cannot create new migrate instance")
	}
	if err = migration.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal().Msg("failed to run migrate up:")
	}
	log.Info().Msg("db migrated successfully")
}