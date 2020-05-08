package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/jmbaur/mood-tracker-backend/config"
	"github.com/jmbaur/mood-tracker-backend/controllers"
	"github.com/jmbaur/mood-tracker-backend/middlewares"
)

func Run() {
	router := gin.Default()

	store := cookie.NewStore([]byte(config.Config.GetString("session.key")))
	store.Options(sessions.Options{SameSite: http.SameSiteLaxMode, Path: "/", HttpOnly: true})

	router.Use(sessions.Sessions("session", store))

	// cors
	corsConfig := cors.DefaultConfig()
	origins := config.Config.GetStringSlice("origins")
	corsConfig.AllowOrigins = origins
	corsConfig.AllowCredentials = true
	router.Use(cors.New(corsConfig))

	// endpoints
	auth := router.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
		auth.GET("/logout", middlewares.AuthRequired(), controllers.Logout)
		auth.GET("/session", middlewares.AuthRequired(), controllers.GetSession)
		auth.PUT("/password", middlewares.AuthRequired(), controllers.ChangePassword)
		auth.DELETE("/account", middlewares.AuthRequired(), controllers.DeleteAccount)
	}

	api := router.Group("/api")
	api.Use(middlewares.AuthRequired())
	{
		api.POST("/marks", controllers.AddMark)
		api.GET("/marks", controllers.GetMarks)
		api.PUT("/marks", controllers.ChangeMark)
		api.DELETE("/marks", controllers.DeleteMark)
		api.GET("/moods", controllers.GetMoods)
		api.POST("/moods", controllers.UpsertMood)
		api.DELETE("/moods", controllers.DeleteMood)
	}

	port := config.Config.GetString("server.port")
	router.Run(":" + port)
}
