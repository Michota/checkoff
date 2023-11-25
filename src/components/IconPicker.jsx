import styled from "styled-components";
import { useState } from "react";
import DynamicMaterialIcon from "./DynamicMaterialIcon";
import icons from "../features/iconpicker/materialicons";

const StyledIconPicker = styled.div.attrs({ className: "icon-picker" })`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;
  border-radius: var(--default-radius);
  padding: 0.4rem;
`;

const IconContainer = styled.div.attrs({ className: "icon-option-container" })`
  cursor: pointer;
`;

function IconPicker({ getIconName, onClick }) {
  const [selectedIcon, setSelectedIcon] = useState();

  function handleIconSelect(iconContainer) {
    const iconName = iconContainer.dataset.icon;
    if (!iconName) return;
    setSelectedIcon(iconName);
    getIconName(iconName);
    if (onClick) onClick(onClick);
  }

  return (
    <StyledIconPicker
      className="icon-picker"
      onClick={(e) => {
        if (e.target === e.currentTarget) return;

        handleIconSelect(e.target.closest(".icon-option-container"));
      }}
    >
      {icons.map((iconName, i) => (
        <IconContainer key={i} data-icon={iconName}>
          <DynamicMaterialIcon icon={iconName} />
        </IconContainer>
      ))}
    </StyledIconPicker>
  );
}

export default IconPicker;