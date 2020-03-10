const moment = require("moment");

Array.prototype.fillEmptyPieMarks = function() {
    for (let i = 0; i < 5; i++) {
        if (!this[i] || this[i].mood !== i + 1) {
            this.splice(i, 0, { mood: i + 1, count: "0" });
        }
    }
    return this;
};

Array.prototype.fillEmptyBarMarks = function() {
    let longest = 0;
    for (let i = 0; i < this.length - 1; i++) {
        if (this[i].length < this[i + 1].length) {
            longest = i + 1;
        }
    }
    let times = [];
    this[longest].forEach(el => times.push(el.t));

    for (let i = 0; i < times.length; i++) {
        for (let j = 0; j < this.length; j++) {
            if (this[j].length !== this[longest].length) {
                let tmpArr = this[j];
                if (!tmpArr[i] || tmpArr[i].t !== times[i]) {
                    tmpArr.splice(i, 0, { t: times[i], y: "0" });
                }
            }
        }
    }
    return this;
};

module.exports = {
    addMark: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, time, mood } = req.body;
        const data = await db.add_mark([user_id, time, mood]);
        res.status(200).send(data);
    },
    getMarks: async (req, res) => {
        const db = req.app.get("db");
        const { user_id, filter, type } = req.query;
        let data = [];
        let arr = [];
        switch (type) {
            case "grid":
                switch (filter) {
                    case "detail":
                        const { doy, year } = req.query;
                        data = await db.get_marks_grid_detail([+user_id, doy, year]);
                        res.status(200).send(data);
                        break;
                    default:
                        data = await db.get_marks_grid(+user_id);
                        res.status(200).send(data);
                }
                break;
            case "line":
                data = await db.get_marks_detail_today(+user_id);
                data = data.map(elem => {
                    return { t: moment(elem.t).format(), y: elem.y, c: elem.c };
                });
                res.status(200).send(data);
                break;
            case "bar":
                switch (filter) {
                    case "today":
                        for (let i = 1; i <= 5; i++) {
                            data = await db.get_marks_bar_today(+user_id, i);
                            arr.push([i, data]);
                        }
                        arr = arr
                            .sort((a, b) => a[0] - b[0])
                            .map(el => {
                                return [...el[1]];
                            })
                            .fillEmptyBarMarks();
                        res.status(200).send(arr);
                        break;
                    case "yesterday":
                        for (let i = 1; i <= 5; i++) {
                            data = await db.get_marks_bar_yesterday(
                                +user_id,
                                i
                            );
                            arr.push([i, data]);
                        }
                        arr = arr
                            .sort((a, b) => a[0] - b[0])
                            .map(el => {
                                return [...el[1]];
                            })
                            .fillEmptyBarMarks();
                        res.status(200).send(arr);
                        break;
                    case "week":
                        for (let i = 1; i <= 5; i++) {
                            data = await db.get_marks_bar_week(+user_id, i);
                            arr.push([i, data]);
                        }
                        arr = arr
                            .sort((a, b) => a[0] - b[0])
                            .map(el => {
                                return [...el[1]];
                            })
                            .fillEmptyBarMarks();
                        res.status(200).send(arr);
                        break;
                    case "month":
                        for (let i = 1; i <= 5; i++) {
                            data = await db.get_marks_bar_month(+user_id, i);
                            arr.push([i, data]);
                        }
                        arr = arr
                            .sort((a, b) => a[0] - b[0])
                            .map(el => {
                                return [...el[1]];
                            })
                            .fillEmptyBarMarks();
                        res.status(200).send(arr);
                        break;
                    case "year":
                        for (let i = 1; i <= 5; i++) {
                            data = await db.get_marks_bar_year(+user_id, i);
                            arr.push([i, data]);
                        }
                        arr = arr
                            .sort((a, b) => a[0] - b[0])
                            .map(el => {
                                return [...el[1]];
                            })
                            .fillEmptyBarMarks();
                        res.status(200).send(arr);
                        break;
                }
                break;
            case "pie":
                switch (filter) {
                    case "today":
                        data = await db.get_marks_pie_today(+user_id);
                        data = data
                            .fillEmptyPieMarks()
                            .map(elem => +elem.count);
                        res.status(200).send(data);
                        break;
                    case "yesterday":
                        data = await db.get_marks_pie_yesterday(+user_id);
                        data = data
                            .fillEmptyPieMarks()
                            .map(elem => +elem.count);
                        res.status(200).send(data);
                        break;
                    case "week":
                        data = await db.get_marks_pie_week(+user_id);
                        data = data
                            .fillEmptyPieMarks()
                            .map(elem => +elem.count);
                        res.status(200).send(data);
                        break;
                    case "month":
                        data = await db.get_marks_pie_month(+user_id);
                        data = data
                            .fillEmptyPieMarks()
                            .map(elem => +elem.count);
                        res.status(200).send(data);
                        break;
                    case "year":
                        data = await db.get_marks_pie_year(+user_id);
                        data = data
                            .fillEmptyPieMarks()
                            .map(elem => +elem.count);
                        res.status(200).send(data);
                        break;
                }
                break;
            case "log":
                data = await db.get_marks_detail(+user_id);
                res.status(200).send(data);
                break;
            default:
                res.status(200).send(data);
        }
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
    }
};
