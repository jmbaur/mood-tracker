const moment = require("moment");

const currentDayOfWeek = moment().format("e");
const currentDay = moment().format();

const firstDayOfWeek = moment().subtract(currentDayOfWeek, 'days').format()

console.log(firstDayOfWeek);
