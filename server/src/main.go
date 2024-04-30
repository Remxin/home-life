package main

import (
	"fmt"
	"net/http"
	"server/prisma/db"
)


var prisma *db.PrismaClient

func main() {
	mux := initializeRoutes()
	prisma = initPrisma()


	fmt.Println("Listening on 8080")
	if err := http.ListenAndServe("localhost:8080", mux); err != nil {
		fmt.Println(err.Error())
	}
	

	
}