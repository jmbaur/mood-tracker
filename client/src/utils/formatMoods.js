export default function formatMoods(moods) {
  const defaultMoods = [
    { num: 1, name: "Bad", color: "#e33133" },
    { num: 2, name: "Not good", color: "#f0743a" },
    { num: 3, name: "OK", color: "#ffbd3a" },
    { num: 4, name: "Good", color: "#97bb3d" },
    { num: 5, name: "Great", color: "#43b83f" }
  ];
  moods.sort((a, b) => a.num - b.num);
  let i = 0;
  while (i < 5) {
    if (moods[i]?.num !== i + 1) {
      moods.splice(i, 0, defaultMoods[i]);
    }
    i++;
  }
  return moods;
}
