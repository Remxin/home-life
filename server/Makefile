postgresname = home-life-postgres-1
dbname = home-life
createdb:
	docker exec -it ${postgresname} createdb --username=root --owner=root ${dbname}

migrateup:
	migrate -path db/migration -database "postgresql://root:zaq12WSX@localhost:5432/${dbname}?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migration -database "postgresql://root:zaq12WSX@localhost:5432/${dbname}?sslmode=disable" -verbose down

sqlc:
	sqlc generate

proto:
	rm -f pb/*.go
	rm -f doc/swagger/*.swagger.json
	protoc --proto_path=proto --go_out=pb --go_opt=paths=source_relative \
	--go-grpc_out=pb --go-grpc_opt=paths=source_relative \
	--grpc-gateway_out=pb --grpc-gateway_opt=paths=source_relative \
	--openapiv2_out=doc/swagger --openapiv2_opt=allow_merge=true,merge_file_name=home-life \
	proto/*.proto
	statik -src=./doc/swagger -dest=./doc
	


.PHONY: createdb, migrateup, migratedown, sqlc, proto