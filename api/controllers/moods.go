package controllers

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jmbaur/mood-tracker-backend/db"
	"github.com/jmbaur/mood-tracker-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpsertMood(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	var mood models.Mood
	if err := c.ShouldBindJSON(&mood); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "bad request"})
		return
	}

	coll := db.GetCollection(database, collection)

	opts := options.Update()
	filter := bson.M{"_id": userId, "moods.num": mood.Number}
	update := bson.M{"$set": bson.M{"moods.$": mood}}
	result, err := coll.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		log.Println("mood update error: ", err)
	}
	if result.MatchedCount != 1 && result.ModifiedCount != 1 {
		filter = bson.M{"_id": userId}
		update = bson.M{"$push": bson.M{"moods": mood}}
		result, err = coll.UpdateOne(context.Background(), filter, update, opts)
		if err != nil {
			log.Println("mood update error: ", err)
		}
		if result.ModifiedCount != 1 {
			c.JSON(http.StatusNoContent, gin.H{"mood": 0})
		} else {
			c.JSON(http.StatusOK, gin.H{"status": "New mood added", "mood": mood})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "Existing mood updated", "mood": mood})
	}
}
func GetMoods(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	coll := db.GetCollection(database, collection)

	var user models.User
	opts := options.FindOne()
	filter := bson.M{"_id": userId}
	err := coll.FindOne(context.Background(), filter, opts).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": err})
		return
	}

	if len(user.Moods) != 0 {
		c.JSON(http.StatusOK, gin.H{"count": len(user.Moods), "moods": user.Moods})
	} else {
		empty := []string{}
		c.JSON(http.StatusOK, gin.H{"count": 0, "moods": empty})
	}

}
func DeleteMood(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	num, _ := strconv.Atoi(c.Query("num"))

	coll := db.GetCollection(database, collection)

	opts := options.Update()
	filter := bson.M{"_id": userId}
	update := bson.M{"$pull": bson.M{"moods": bson.M{"num": num}}}
	result, err := coll.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": err})
		return
	}

	if result.ModifiedCount != 1 {
		c.JSON(http.StatusOK, gin.H{"status": "No mark deleted"})
	} else {
		c.JSON(http.StatusOK, "OK")
	}
}
