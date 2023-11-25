/**
 * Adds opacity value to a hexadecimal color code.
 *
 * @param {string} hex - The hexadecimal color code starting with the '#' character.
 * @param {number} opacityValue - The opacity value ranging from 0 to 100.
 * @returns {string} - The hexadecimal color code with the added opacity value.
 * @throws {Error} - Throws an error if the color code does not contain the '#' character.
 *
 * @example
 * const hexWithOpacity = addAlphaToHex("#336699", 50);
 * // Returns: "#33669950"
 *
 * @example
 * const hexWithMaxOpacity = addAlphaToHex("#FF0000", 100);
 * // Returns: "#FF0000"
 *
 * @example
 * const hexWithoutHashtag = addAlphaToHex("336699", 50);
 * // Throws an error: "Hex has to have hashtag!"
 */

export default function addAlphaToHex(hex, opacityValue) {
  if (!hex.includes("#")) throw new Error("Hex has to have hashtag!");

  function getOpacity() {
    if (opacityValue < 10) return "0" + opacityValue;
    if (opacityValue >= 100) return "";
    return opacityValue;
  }

  const colorCode = hex.replace("#", "");
  const colorCodeWithOpacity = `#${colorCode}${getOpacity()}`;
  return colorCodeWithOpacity;
}
