package main

import (
	"server/prisma/db"
)

func initPrisma() *db.PrismaClient {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
		  panic(err)
		}
	}()

	return client
}