import styled from "styled-components";
import colors from "../features/colorpicker/colors";
import ColorPickerOption from "./ColorPickerOption";
import { useState } from "react";

const StyledColorPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;
  background-color: white;
  border-radius: var(--default-radius);
  padding: 0.4rem;
`;

function ColorPicker({ onClick }) {
  const [selectedColor, setSelectedColor] = useState();

  function handleColorChange(color) {
    setSelectedColor(color);
    if (onClick) onClick(color);
  }

  // It also may be changed to Array.from, but this way its easier to change order of colors.
  const { red, orange, yellow, green, cyan, blue, purple, pink } = colors;
  return (
    <StyledColorPicker>
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={red}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={orange}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={yellow}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={green}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={pink}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={purple}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={blue}
      />
      <ColorPickerOption
        onClick={(e) => handleColorChange(e.target.dataset.color)}
        color={cyan}
      />
    </StyledColorPicker>
  );
}

export default ColorPicker;
