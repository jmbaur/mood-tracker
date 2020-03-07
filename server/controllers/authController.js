const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db");
        const { firstName, username, email, password } = req.body;

        const existingUser = await db.get_user(email);
        if (existingUser.length) {
            res.status(409).send("User with that email already exists.");
        } else {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            const [newUser] = await db.add_user([
                firstName,
                username,
                email,
                hash
            ]);
            req.session.user = {
                firstName: newUser.first_name,
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                custom_mood: newUser.custom_mood
            };
            res.status(200).send(req.session.user);
        }
    },
    login: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;

        const foundUser = await db.get_user(email);

        if (!foundUser.length) {
            res.status(401).send("No user with that email exists.");
        } else {
            const match = await bcrypt.compare(password, foundUser[0].password);
            if (!match) {
                res.status(401).send("Email or password is incorrect.");
            } else {
                req.session.user = {
                    firstName: foundUser[0].first_name,
                    user_id: foundUser[0].user_id,
                    username: foundUser[0].username,
                    email: foundUser[0].email,
                    custom_mood: foundUser[0].custom_mood
                };
                res.status(200).send(req.session.user);
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    session: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else res.send(null);
    },
    account: async (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        const deleted = await db.delete_user(+id);
        deleted.length ? res.sendStatus(200) : res.sendStatus(500);
    }
};
