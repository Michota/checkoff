export default function stringShortener(
  string,
  NUMBER_OF_WORDS = 5,
  ELIPSIS = true
) {
  const elipsis = ELIPSIS ? "..." : "";

  const words =
    string
      .split(" ")
      .map((word, index) => (index < NUMBER_OF_WORDS ? word : ""))
      .join(" ")
      .trim() + elipsis;
  return words;
}
