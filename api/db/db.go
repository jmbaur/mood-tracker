package db

import (
	"context"
	"log"
	"time"

	"github.com/jmbaur/mood-tracker-backend/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/x/bsonx"
)

var client *mongo.Client

func Connect() {
	dbString := config.Config.GetString("database.string")

	var err error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(dbString))
	if err != nil {
		log.Fatal(err)
	}

	populateIndex("mood-tracker", "users")
}

func populateIndex(database, collection string) {
	coll := client.Database(database).Collection(collection)
	_, err := coll.Indexes().CreateOne(context.Background(),
		mongo.IndexModel{
			Keys:    bsonx.Doc{{"username", bsonx.Int32(1)}},
			Options: options.Index().SetUnique(true),
		})
	if err != nil {
		log.Println("Indexes().CreateOne() error: ", err)
	}
}

func GetCollection(database, collection string) *mongo.Collection {
	coll := client.Database(database).Collection(collection)
	return coll
}
