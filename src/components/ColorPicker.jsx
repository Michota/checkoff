import styled from "styled-components";
import { default as defaultColors } from "../features/habits/colorpicker/colors";
import ColorPickerOption from "./ColorPickerOption";

const StyledColorPicker = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$columns}, 1fr)`};
  width: fit-content;
  height: fit-content;
  gap: 0.6rem;
  background-color: white;
  border-radius: var(--default-radius);
  padding: 0.4rem;
`;

function ColorPicker({ onClick, colors = defaultColors, columns = 4 }) {
  function handleColorChange(color) {
    if (onClick) onClick(color);
  }

  const colorArray = Array.isArray(colors) ? colors : Object.values(colors);

  return (
    <StyledColorPicker $columns={columns} className="color-picker">
      {colorArray.map((color) => (
        <ColorPickerOption
          key={color}
          onClick={(e) => handleColorChange(e.target.dataset.color)}
          color={color}
        />
      ))}
    </StyledColorPicker>
  );
}

export default ColorPicker;
