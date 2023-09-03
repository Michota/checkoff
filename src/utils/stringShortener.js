export default function stringShortener(
  description,
  NUMBER_OF_WORDS = 5,
  ELIPSIS = true
) {
  const elipsis = ELIPSIS ? "..." : "";

  const words =
    description
      .split(" ")
      .map((word, index) => (index < NUMBER_OF_WORDS ? word : ""))
      .join(" ")
      .trim() + elipsis;
  return words;
}
