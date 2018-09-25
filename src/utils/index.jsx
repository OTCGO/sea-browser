export function getRandomColor() {
  const arr = ["warning", "success", "danger", "info", "primary", "rose"];

  return arr[Math.floor(Math.random() * arr.length)];
}
