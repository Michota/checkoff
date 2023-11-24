import styled from "styled-components";

const StyledColorPickerOption = styled.div`
  width: 2rem;
  aspect-ratio: 1/1;
  /* prettier-ignore */
  background-color: ${(props) => props["data-color"]};
  cursor: pointer;
`;

function ColorPickerOption({ color, onClick }) {
  return <StyledColorPickerOption onClick={onClick} data-color={color} />;
}

export default ColorPickerOption;
