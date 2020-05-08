package controllers

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jmbaur/mood-tracker-backend/db"
	"github.com/jmbaur/mood-tracker-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, "Invalid JSON provided")
		return
	}

	bytes, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
	user.Password = string(bytes)

	coll := db.GetCollection(database, collection)

	res, err := coll.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusConflict, "User with that username already exists")
		return
	}
	id := res.InsertedID
	c.JSON(http.StatusOK, gin.H{"id": id})
}

func Login(c *gin.Context) {
	// bind request body to user
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, "Invalid JSON provided")
		return
	}

	coll := db.GetCollection(database, collection)

	var result models.User
	opts := options.FindOne()
	filter := bson.M{"username": user.Username}
	err := coll.FindOne(context.Background(), filter, opts).Decode(&result)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "Email or password incorrect")
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, "Email or password incorrect")
		return
	}

	session := sessions.Default(c)
	session.Set("user_id", result.ID.Hex())
	if err := session.Save(); err != nil {
		log.Println("Session save error: ", err)
	}
	c.JSON(http.StatusOK, gin.H{"username": result.Username})
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	if err := session.Save(); err != nil {
		log.Println("Session save error: ", err)
	}
	c.JSON(http.StatusOK, "Logged out")
}

func GetSession(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, "User not logged in")
		return
	}
	userId, _ = primitive.ObjectIDFromHex(userId.(string))
	coll := db.GetCollection(database, collection)

	var result models.User
	opts := options.FindOne()
	filter := bson.M{"_id": userId}
	err := coll.FindOne(context.Background(), filter, opts).Decode(&result)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "User does not exist")
		return
	}
	c.JSON(http.StatusOK, gin.H{"username": result.Username})
}

func ChangePassword(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, "Could not parse JSON")
		return
	}

	coll := db.GetCollection(database, collection)

	bytes, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
	user.Password = string(bytes)

	filter := bson.M{"_id": userId, "username": user.Username}
	update := bson.M{"password": user.Password}
	result, err := coll.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusConflict, "Could not change password")
	}
	if result.ModifiedCount == 1 {
		c.JSON(http.StatusOK, "Password changed")
	} else {
		c.JSON(http.StatusNotModified, "Password could not be changed")
	}
}

func DeleteAccount(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	coll := db.GetCollection(database, collection)

	filter := bson.M{"_id": userId}
	opts := options.Delete()
	_, err := coll.DeleteOne(context.Background(), filter, opts)
	if err != nil {
		log.Println("error deleting user", err)
		c.JSON(http.StatusNotFound, gin.H{"status": "Could not delete user"})
		return
	}
	c.JSON(http.StatusOK, "Account deleted")
}
