export default function formatMoods(moods) {
  const defaultMoods = [
    { number: 1, name: "Bad", color: "#e33133" },
    { number: 2, name: "Not good", color: "#f0743a" },
    { number: 3, name: "OK", color: "#ffbd3a" },
    { number: 4, name: "Good", color: "#97bb3d" },
    { number: 5, name: "Great", color: "#43b83f" }
  ];
  moods.sort((a, b) => a.number - b.number);
  let i = 0;
  while (i < 5) {
    if (moods[i]?.number !== i + 1) {
      moods.splice(i, 0, defaultMoods[i]);
    } else {
      moods[i].color = moods[i].color || defaultMoods[i].color;
      moods[i].name = moods[i].name || defaultMoods[i].name;
    }
    i++;
  }
  return moods;
}
