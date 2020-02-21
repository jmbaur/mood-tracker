require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

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
app.post("/auth/register");
app.post("/auth/login");
app.get("/auth/logout");
app.get("/auth/session");

// mood endpoints

const PORT = process.env.SERVER_PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
