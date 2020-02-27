module.exports = {
    addMark: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, time, mood } = req.body;
        const data = await db.add_mark([user_id, time, mood]);
        res.status(200).send(data);
    },
    getAllMarks: async (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.query;
        const data = await db.get_marks(user_id);
        res.status(200).send(data);
    },
    getAllMarksDetailed: async (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.query;
        const data = await db.get_marks_detail(user_id);
        res.status(200).send(data);
    },
    deleteMark: async (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        const deleted = await db.delete_mark(+id);
        deleted.length ? res.sendStatus(200) : res.sendStatus(500);
    },
    changeMark: async (req, res) => {
        const db = req.app.get("db");
        const { mood } = req.body;
        const { id } = req.params;
        const modified = await db.change_mark([mood, +id]);
        modified.length ? res.sendStatus(200) : res.sendStatus(500);
    }
};
