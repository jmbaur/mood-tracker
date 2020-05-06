package config

import (
	"log"

	"github.com/spf13/viper"
)

var Config *viper.Viper

func GetConfig() {
	Config = viper.New()
	Config.SetConfigName("env")
	Config.SetConfigType("yml")
	Config.AddConfigPath(".")
	err := Config.ReadInConfig()
	if err != nil {
		log.Fatal("Configuration error:", err)
	}
}
