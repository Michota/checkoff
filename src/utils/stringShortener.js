export default function stringShortener(
  string,
  NUMBER_OF_WORDS = 5,
  ELIPSIS = "..."
) {
  if (typeof string !== "string") throw new Error("This is not a string!");

  const MAX_WORD_LENGTH = 32;

  const elipsis = ELIPSIS || "";

  const words =
    string
      .split(" ")
      .map((word, index) => (index < NUMBER_OF_WORDS ? word : ""))
      .join(" ")
      .trim() + elipsis;

  return words.length > MAX_WORD_LENGTH
    ? words.slice(0, MAX_WORD_LENGTH) + elipsis
    : words;
}
