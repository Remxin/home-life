
# 🏠 Home Life 🏠
Mobile app for managing household chores and shopping lists

**!! 🏗️ Under developement !!**


## 🤖 Technologies used
### Client
- Typescript
- React Native
- Expo
- Async Storage
- Redux toolkit

### Server
- Go
- Sqlc
- gRPC
- Go-redis
- Golang migrate
- Statik
- Viper
- Go Mock

### Database
- PostgreSQL
- Redis

## Getting started
1. Database configuration
```
cd server
```
```
docker compose up
```

2. Run server

There is a **sample.env** file provided in server directory.

```
cd server
```
```
make createdb
```
```
make migrateup
```
```
make server
```

**make createdb** and **make migrateup** must be used for initialization. Then you can ignore this commands and proceed directly into **make server**.

3. Run client
```
cd client
```
```
npm install
```
```
npm start
```

Then open the application on web, simulator or scanning QR code on your phone.

## Create new db migration
1. Add new version
```
migrate create -ext sql -dir db/migration/ -seq migration_name
```
2. Add SQL code in **/db/migration**
3. Apply changes
```
make migrateup
```

## Create new SQL queries using sqlc
1. Enter query folder
```
cd server/db/query
```
2. Create / edit .sql file using sqlc syntax
3. Generate golang code
```
make sqlc
```

## 🖼️ Images
![login screen]("https://github.com/Remxin/home-life/readme-images/login.png")