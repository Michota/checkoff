import styled from "styled-components";
import { useState } from "react";
import { Md10K, MdMailOutline, MdPeople } from "react-icons/md";

const StyledIconPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;
  background-color: red;
  border-radius: var(--default-radius);
  padding: 0.4rem;
`;

function IconPicker({ onClick }) {
  const [selectedIcon, setSelectedIcon] = useState();
  console.log(selectedIcon);

  function handleChange(icon) {
    const iconHTML = icon.outerHTML;
    setSelectedIcon(iconHTML);
    console.log(iconHTML);
    if (onClick) onClick(iconHTML);
  }

  return (
    <StyledIconPicker
      className="icon-picker"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          const selectedIconName = e.target.tagName.toLowerCase();
          switch (selectedIconName) {
            case "svg":
              handleChange(e.target);
              break;
            case "path":
              // If the path inside the SVG is clicked, find the parent SVG element
              handleChange(e.target.closest("svg"));
              break;
            default:
              break;
          }
        }
      }}
    >
      <Md10K />
    </StyledIconPicker>
  );
}

export default IconPicker;
