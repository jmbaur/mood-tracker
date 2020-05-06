package controllers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jmbaur/mood-tracker-backend/db"
	"github.com/jmbaur/mood-tracker-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// gets all marks
func GetMarks(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	startQuery := c.DefaultQuery("start", "2006-01-02T15:04:05Z")
	endQuery := c.DefaultQuery("end", time.Now().Format(time.RFC3339))
	start, startErr := time.Parse(time.RFC3339, startQuery)
	end, endErr := time.Parse(time.RFC3339, endQuery)
	if startErr != nil || endErr != nil {
		c.JSON(http.StatusUnprocessableEntity, "Incorrect time format")
		return
	}

	coll := db.GetCollection(database, collection)
	ctx := context.Background()

	// opts := options.Aggregate()
	matchStage := bson.M{"$match": bson.M{"_id": userId}}
	filterStage := bson.M{"$filter": bson.M{"input": "$marks",
		"as": "mark",
		"cond": bson.M{"$and": bson.A{
			bson.M{"$gte": bson.A{"$$mark.time", start}},
			bson.M{"$lte": bson.A{"$$mark.time", end}}}}}}
	projectStage := bson.M{"$project": bson.M{"_id": 0, "marks": filterStage}}
	// unwindStage := bson.M{"$unwind": "$marks"}
	cursor, err := coll.Aggregate(ctx,
		[]bson.M{matchStage, projectStage})
	if err != nil {
		log.Println("get marks error: ", err)
		c.JSON(http.StatusNotFound, gin.H{"error": err})
		return
	}
	var marks []bson.M
	if err := cursor.All(ctx, &marks); err != nil {
		log.Println(err)
	}

	c.JSON(http.StatusOK, gin.H{"results": marks[0]})
}

func AddMark(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	var mark models.Mark
	// Manually set ID since Mongo won't do it for subdocuments
	mark.ID = primitive.NewObjectID()
	if err := c.ShouldBindJSON(&mark); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": err})
		return
	}

	// get DB
	coll := db.GetCollection(database, collection)

	opts := options.Update()
	filter := bson.M{"_id": userId}
	update := bson.M{"$push": bson.M{"marks": mark}}
	result, err := coll.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		log.Println("update error: ", err)
	}
	if result.ModifiedCount == 1 {
		c.JSON(http.StatusOK, gin.H{"id": mark.ID.Hex()})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"status": "No mark added"})
	}
}

func ChangeMark(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	markId, _ := primitive.ObjectIDFromHex(c.Query("id"))

	var mark models.Mark
	if err := c.ShouldBindJSON(&mark); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": err})
		return
	}

	coll := db.GetCollection(database, collection)

	opts := options.Update().SetUpsert(true)
	filter := bson.M{"_id": userId, "marks._id": markId}

	update := bson.M{}
	// find where the update is
	if mark.Comment != "" && mark.Number != 0 {
		update = bson.M{"$set": bson.M{"marks.$.num": mark.Number, "marks.$.comment": mark.Comment}}
	} else if mark.Comment != "" {
		update = bson.M{"$set": bson.M{"marks.$.comment": mark.Comment}}
	} else if mark.Number != 0 {
		update = bson.M{"$set": bson.M{"marks.$.num": mark.Number}}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"status": "No update found."})
		return
	}
	result, err := coll.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": err})
		return
	}
	if result.ModifiedCount == 1 {
		c.JSON(http.StatusOK, "OK")
	}
}

func DeleteMark(c *gin.Context) {
	userId, _ := primitive.ObjectIDFromHex(c.MustGet("userId").(string))

	markId, _ := primitive.ObjectIDFromHex(c.Query("id"))

	coll := db.GetCollection(database, collection)

	opts := options.Update()
	filter := bson.M{"_id": userId}
	update := bson.M{"$pull": bson.M{"marks": bson.M{"_id": markId}}}
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
