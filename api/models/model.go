package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Mark struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Number  int                `json:"number" bson:"number"`
	Time    time.Time          `json:"time,omitempty" bson:"time"`
	Comment string             `json:"comment,omitempty" bson:"comment,omitempty"`
}

type Mood struct {
	Number int    `json:"number" bson:"number"`
	Name   string `json:"name,omitempty" bson:"name,omitempty"`
	Color  string `json:"color,omitempty" bson:"color,omitempty"`
}

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Password string             `json:"password" bson:"password"`
	Marks    []Mark             `json:"marks,omitempty" bson:"marks,omitempty"`
	Moods    []Mood             `json:"moods,omitempty" bson:"moods,omitempty"`
}
