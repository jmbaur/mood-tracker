module.exports = {
    getMoods: async (req, res) => {
        const db = req.app.get("db");
        const moods = await db.get_moods();
        res.status(200).send(moods);
    },
    mark: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, mood_id, time } = req.body;

        const data = await db.mark_mood([]);
    }
};
