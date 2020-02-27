module.exports = {
    addComment: async (req, res) => {
        const db = req.app.get("db");
        const { mark_id, comment, user_id } = req.body;
        const added = await db.add_comment([mark_id, comment, user_id]);
        added.length ? res.sendStatus(200) : res.sendStatus(500);
    },
    changeComment: async (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;
        const { mark_id, comment, user_id } = req.body;
        const modified = await db.change_comment([
            id,
            mark_id,
            comment,
            user_id
        ]);
        modified.length ? res.sendStatus(200) : res.sendStatus(500);
    }
};
