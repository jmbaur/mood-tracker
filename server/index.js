require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./controllers/authController.js");
const moodCtrl = require("./controllers/moodController.js");
const markCtrl = require("./controllers/markController.js");
const commentCtrl = require("./controllers/commentController.js");

const app = express();

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
    })
);

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("DB connected");
    })
    .catch(err => console.log("DB connection error: ", err));

// auth endpoints
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/auth/session", authCtrl.session);

// mark endpoints
app.post("/api/mark", markCtrl.addMark);
app.get("/api/marks", markCtrl.getAllMarks);
app.get("/api/marks_detail", markCtrl.getAllMarksDetailed);
app.get("/api/marks_filter", markCtrl.getMarksFilter);
app.put("/api/marks/:id", markCtrl.changeMark);
app.delete("/api/marks", markCtrl.deleteMark);

// mood endpoints
app.post("/api/moods", moodCtrl.addMoodNames);
app.get("/api/moods/:id", moodCtrl.getMoodNames);

// comment endpoints
app.post("/api/comments", commentCtrl.addComment);
app.put("/api/comments/:id", commentCtrl.changeComment);

const PORT = process.env.SERVER_PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
