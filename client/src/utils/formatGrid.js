import moment from "moment";

export default function formatGrid(marks, moods, start, end) {
  const colors = moods.map(mood => mood.color);

  let tmpArr = [];
  let tmpMark = cleanTmpMark();

  // reduce marks into individual days
  for (let i = 0; i < marks.length - 1; i++) {
    let doy0 = +moment(marks[i].time).format("DDD");
    let doy1 = +moment(marks[i + 1].time).format("DDD");

    if (doy0 === doy1) {
      // same day
      tmpMark.count++;
      tmpMark.mood += marks[i].number;
      tmpMark.doy = doy0;
      tmpMark.viewDate = moment(marks[i].time).format("ddd MMM DD");
      tmpMark.fullDate = moment(marks[i].time)
        .startOf("day")
        .format();
    } else {
      // new day
      tmpMark.color =
        colors[(Math.round(tmpMark.mood / tmpMark.count) || 1) - 1];
      tmpArr.push(tmpMark);
      tmpMark = cleanTmpMark();
    }
  }

  // generate info for last tmpMark
  tmpMark.color = colors[(Math.round(tmpMark.mood / tmpMark.count) || 1) - 1];
  tmpMark.count++;
  // push on last tmpMark
  tmpArr.push(tmpMark);

  fill(tmpArr);
  return tmpArr;
}

function fill(arr) {
  const daysToGet = 83 + parseInt(moment().format("e"));
  const start = +moment()
    .subtract(daysToGet, "days")
    .startOf("day")
    .format("DDD");
  const end = +moment()
    .endOf("day")
    .format("DDD");

  // fill array empty days
  for (let i = 0; i < end - start; i++) {
    if (arr[i]?.doy !== i + start) {
      arr.splice(i, 0, {
        count: 0,
        color: "#ffffff",
        viewDate: moment()
          .dayOfYear(i + start)
          .format("ddd MMM DD")
      });
    }
  }
}

function cleanTmpMark() {
  return {
    count: 0,
    mood: 0
  };
}
