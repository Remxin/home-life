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

mock:
	mockgen -destination db/mock/store.go github.com/Remxin/home-life/server/db/sqlc Store

proto:
	rm -f pb/*.go
	rm -f doc/swagger/*.swagger.json
	protoc --proto_path=proto --go_out=pb --go_opt=paths=source_relative \
	--go-grpc_out=pb --go-grpc_opt=paths=source_relative \
	--grpc-gateway_out=pb --grpc-gateway_opt=paths=source_relative \
	--openapiv2_out=doc/swagger --openapiv2_opt=allow_merge=true,merge_file_name=home-life \
	proto/*.proto
	statik -src=./doc/swagger -dest=./doc

client_proto:
	rm -f ../client/grpc/*
	protoc --proto_path=proto \
	--js_out=import_style=commonjs,binary:../client/grpc \
	--grpc-web_out=import_style=typescript,mode=grpcwebtext:../client/grpc \
	proto/*proto

db_docs:
	dbdocs build doc/db.dbml

db_schema:
	dbml2sql --postgres -o doc/schema.sql doc/db.dbml
	
server:
	go run main.go


.PHONY: createdb migrateup migratedown sqlc mock proto client_proto db_docs db_schema server 