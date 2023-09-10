export default function stringShortener(
  string,
  maxInputLength = 16,
  OPTIONS = { method: "words", maxLength: 5, elipsis: "..." }
) {
  if (typeof string !== "string") throw new Error("This is not a string!");

  if (string.length <= maxInputLength) return string;

  const elipsis = OPTIONS.elipsis || "...";

  // Words
  if (OPTIONS.method === "words") {
    const maxWordLength = 16;

    const words =
      string
        .split(" ")
        .map((word, index) => (index < OPTIONS.maxLength ? word : ""))
        .join(" ")
        .trim() + elipsis;

    return words.length > maxWordLength
      ? words.slice(0, maxWordLength) + elipsis
      : words;

    // Letters
  } else {
    const maxLength = OPTIONS.maxLength || maxInputLength;
    const letters =
      string
        .split("")
        .map((letter, index) => (index > maxLength ? letter : ""))
        .join("")
        .trim() + elipsis;

    return letters.length > OPTIONS.maxLength
      ? letters.slice(0, OPTIONS.maxLength) + elipsis
      : letters;
  }
}
