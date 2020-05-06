export default function formatData(marks) {
  let pieMarks = new Float32Array(5);
  for (let i = 0; i < marks.length; i++) {
    pieMarks[marks[i].number - 1]++;
  }
  // const formatData = (data, filter) => {
  //   const dow = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  //   // Extra formatting for bar chart
  //   let tmpData = [];
  //   let tmpLabels = [];
  //   for (let i = 0; i < data.length; i++) {
  //     let tmpArr = [];
  //     for (let j = 0; j < data[i].length; j++) {
  //       tmpArr.push(parseInt(data[i][j].y));
  //     }
  //     tmpData.push(tmpArr);
  //   }
  //   for (let i = 0; i < data[0].length; i++) {
  //     switch (filter) {
  //       case "today":
  //       case "yesterday":
  //         tmpLabels.push(data[0][i].t + ":00");
  //         break;
  //       case "week":
  //         tmpLabels.push(dow[data[0][i].t]);
  //         break;
  //       default:
  //         tmpLabels.push(data[0][i].t.toString());
  //     }
  //   }
  //   // this.setState({ barData: tmpData, barLabels: tmpLabels });
  // };
  return { pieMarks, barMarks: marks };
}
