export default function formatMoods(moods) {
  moods.sort((a, b) => a.number - b.number);
  const defaultMoods = [
    { number: 1, name: "Bad", color: "#e33133" },
    { number: 2, name: "Not good", color: "#f0743a" },
    { number: 3, name: "OK", color: "#ffbd3a" },
    { number: 4, name: "Good", color: "#97bb3d" },
    { number: 5, name: "Great", color: "#43b83f" }
  ];
  for (let i = 0; i < 5; i++) {
    if (moods[i]?.number !== i + 1) {
      moods.splice(i, 0, defaultMoods[i]);
    } else {
      if (!moods[i].name) moods[i].name = defaultMoods[i].name;
      if (!moods[i].color) moods[i].color = defaultMoods[i].color;
    }
  }
  return moods;
}
