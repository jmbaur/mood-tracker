module.exports = {
    getMoods: async (req, res) => {
        const db = req.app.get("db");
        const moods = await db.get_moods();
        res.status(200).send(moods);
    },
    mark: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, time, mood } = req.body;
        const data = await db.add_mark([user_id, time, mood]);
        res.status(200).send(data);
    },
    getAllMarks: async (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.body;
        const data = await db.get_marks(user_id);
        res.status(200).send(data);
    }
};
