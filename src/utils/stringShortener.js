export default function stringShortener(
  string,
  OPTIONS = { method: "words", maxLength: 5, elipsis: "..." }
) {
  if (typeof string !== "string") throw new Error("This is not a string!");

  const elipsis = OPTIONS.elipsis || "";
  if (OPTIONS.method === "words") {
    const MAX_WORD_LENGTH = 16;

    const words =
      string
        .split(" ")
        .map((word, index) => (index < OPTIONS.maxLength ? word : ""))
        .join(" ")
        .trim() + elipsis;

    return words.length > MAX_WORD_LENGTH
      ? words.slice(0, MAX_WORD_LENGTH) + elipsis
      : words;
  } else {
    const letters =
      string
        .split("")
        .map((letter, index) => (index < OPTIONS.maxLength ? letter : ""))
        .join("")
        .trim() + elipsis;

    return letters.length > OPTIONS.maxLength
      ? letters.slice(0, OPTIONS.maxLength) + elipsis
      : letters;
  }
}
