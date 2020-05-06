package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Mark struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	Number  int                `json:"number" bson:"number"`
	Time    time.Time          `json:"time" bson:"time"`
	Comment string             `json:"comment" bson:"comment,omitempty"`
}

type Mood struct {
	Number int    `json:"number" bson:"number"`
	Name   string `json:"name" bson:"name,omitempty"`
	Color  string `json:"color" bson:"color,omitempty"`
}

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `bson:"username"`
	Password string             `bson:"password"`
	Marks    []Mark             `bson:"marks,omitempty"`
	Moods    []Mood             `bson:"moods,omitempty"`
}
