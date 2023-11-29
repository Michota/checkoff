/**
 * Adds opacity value to a color code.
 *
 * @param {string} color - The color code. It can be a hexadecimal color code starting with the '#' character or a CSS variable (e.g., 'var(--variable-name)').
 * @param {number} opacity - The opacity value ranging from 0 to 100.
 * @returns {string} - The color code with the added opacity value.
 * @throws {Error} - Throws an error if the color code is missing the '#' character or if it's not a valid CSS variable.
 *
 * @example
 * const colorWithOpacity = addAlphaToColor("#336699", 50);
 * // Returns: "#33669950"
 *
 * @example
 * const colorWithMaxOpacity = addAlphaToColor("#FF0000", 100);
 * // Returns: "#FF0000"
 *
 * @example
 * const variableColorWithOpacity = addAlphaToColor("var(--custom-color)", 30);
 * // Returns: "var(--custom-color30)"
 *
 * @example
 * const invalidColor = addAlphaToColor("336699", 50);
 * // Throws an error: "Color code must start with '#' or be a valid CSS variable!"
 */

export default function addAlphaToColor(color, opacity) {
  let newColor = color;

  if (newColor.includes("var")) {
    newColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(getVar(color));
  }
  if (!newColor.includes("#")) throw new Error("Hex has to have hashtag!");

  const colorCode = newColor.replace("#", "");
  const colorCodeWithOpacity = `#${colorCode}${getOpacity(opacity)}`;
  return colorCodeWithOpacity;
}

// Get variable name that is store inside GlobalStyles.js as var(--variable-name)
function getVar(inputString) {
  return inputString.replace(/var\(([^)]+)\)/, "$1");
}

function getOpacity(opacity) {
  if (opacity < 10) return "0" + opacity;
  if (opacity >= 100) return "";
  return opacity;
}
