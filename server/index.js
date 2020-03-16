require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
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
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);
// CORS
app.use(cors({ credentials: true }));

// Serve up files from backend
app.use(express.static(`${__dirname}/../build`));

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
app.put("/auth/password", authCtrl.password);
app.delete("/auth/account/:id", authCtrl.account);

// mark endpoints
app.post("/api/marks", markCtrl.addMark);
app.get("/api/marks", markCtrl.getMarks);
app.put("/api/marks/:id", markCtrl.changeMark);
app.delete("/api/marks", markCtrl.deleteMark);

// mood endpoints
app.post("/api/moods", moodCtrl.addMoodName);
app.get("/api/moods/:id", moodCtrl.getMoodNames);
app.delete("/api/moods/:id", moodCtrl.deleteMood);

// comment endpoints
app.post("/api/comments", commentCtrl.addComment);
app.put("/api/comments/:id", commentCtrl.changeComment);

const PORT = process.env.SERVER_PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
