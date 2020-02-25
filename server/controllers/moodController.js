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
    },
    deleteMark: (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        db.delete_mark(+id);
        res.sendStatus(200);
    },
    changeMark: (req, res) => {
        const db = req.app.get("db");
        const { mood } = req.body;
        const { id } = req.params;
        console.log(mood, id);
        db.change_mark([mood, +id]);
        res.sendStatus(200);
    }
};
