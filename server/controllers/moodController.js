module.exports = {
    addMoodName: async (req, res) => {
        const db = req.app.get("db");
        const { num, name, user_id } = req.body;
        const added = await db.add_mood([num, name, user_id]);
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
        console.log(id, typeof id)
        await db.delete_mood(+id);
        res.sendStatus(200)
    }
};
