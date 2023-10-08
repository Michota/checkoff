import { MdCheckBox, MdOutlineSquare } from "react-icons/md";
import styled, { css } from "styled-components";
import { useTaskContext } from "../Task";

const StyledCheckboxHitbox = styled.label`
  aspect-ratio: 1 / 1;
  width: fit-content;
  height: fit-content;
  display: flex;
  cursor: pointer;
  font-size: 2.2rem;

  transition-property: transform, opacity;
  transition-duration: 100ms;
  &:hover {
    transform: scale(95%);
    opacity: 0.8;
  }

  ${(props) => {
    const priority = props.$priority ?? 0;
    return css`
      color: var(--priority-${priority});
    `;
  }}
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  border: 0;
  clip: rect(0 0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

function Checkbox({ className }) {
  const { priority, isCompleted, updateState } = useTaskContext();

  return (
    <StyledCheckboxHitbox
      className={className}
      $priority={priority}
      $isCompleted={isCompleted}
      onClick={(e) => e.stopPropagation()}
    >
      {isCompleted ? <MdCheckBox /> : <MdOutlineSquare />}
      <HiddenCheckbox
        aria-checked={isCompleted}
        onClick={(e) => {
          e.stopPropagation();
          updateState("isCompleted", !isCompleted);
        }}
      />
    </StyledCheckboxHitbox>
  );
}

export default Checkbox;
