package middlewares

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userId := session.Get("user_id")
		if userId == nil {
			c.Abort()
			c.JSON(http.StatusUnauthorized, "User not logged in")
		} else {
			c.Set("userId", userId.(string))
		}
	}
}
