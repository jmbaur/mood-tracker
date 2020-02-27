module.exports = {
    addMoodNames: async (req, res) => {
        const db = req.app.get("db");
        const { num, name, user_id } = req.body;
        const added = await db.add_custom_names([num, name, user_id]);
        added.length ? res.sendStatus(200) : res.sendStatus(500);
    },
    getMoodNames: async (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        const moods = await db.get_custom_names(id);
        res.status(200).send(moods);
    },
    deleteMood: async (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        const deleted = await db.delete_mood_name(id);
        deleted.length ? res.sendStatus(200) : res.sendStatus(500);
    }
};
