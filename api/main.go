package main

import (
	"github.com/jmbaur/mood-tracker-backend/config"
	"github.com/jmbaur/mood-tracker-backend/db"
	"github.com/jmbaur/mood-tracker-backend/server"
)

func main() {
	config.GetConfig()
	db.Connect()
	server.Run()
}
