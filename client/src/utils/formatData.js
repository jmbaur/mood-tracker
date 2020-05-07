export default function formatData(marks) {
  let pieMarks = new Float32Array(5);
  for (let i = 0; i < marks.length; i++) {
    pieMarks[marks[i].number - 1]++;
  }
  let lineMarks = marks.map(el => {
    return { t: el.time, y: el.number };
  });
  return { pieMarks, lineMarks };
}
