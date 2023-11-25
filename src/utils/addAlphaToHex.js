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
