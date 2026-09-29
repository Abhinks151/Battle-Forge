export function sleep(ms, message) {
  if (message) console.log(message);

  return new Promise((resolve) => setTimeout(resolve, ms));
}
