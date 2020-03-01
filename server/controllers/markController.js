const moment = require("moment");

module.exports = {
    addMark: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, time, mood } = req.body;
        // const time = moment().format();
        const data = await db.add_mark([user_id, time, mood]);
        res.status(200).send(data);
    },
    getAllMarks: async (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.query;
        const data = await db.get_marks(user_id);
        console.log(data);
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
        const { comment_id, mark_id } = req.query;
        const deleted = await db.delete_mark(+comment_id, +mark_id);
        deleted.length ? res.sendStatus(200) : res.sendStatus(500);
    },
    changeMark: async (req, res) => {
        const db = req.app.get("db");
        const { mood } = req.body;
        const { id } = req.params;
        const modified = await db.change_mark([+mood, +id]);
        modified.length ? res.sendStatus(200) : res.sendStatus(500);
    },
    getMarksFilter: async (req, res) => {
        const db = req.app.get("db");
        const { filter, user_id } = req.query;
        let data;
        switch (filter) {
            case "day":
                data = await db.get_marks_detail_today(+user_id);
                data = data.map(elem => {
                    return { t: moment(elem.t).format(), y: elem.y, c: elem.c };
                });
                break;
            default:
                data = [];
        }
        res.status(200).send(data);
    }
};
