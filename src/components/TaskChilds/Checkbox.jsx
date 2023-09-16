import { MdDone } from "react-icons/md";
import styled, { css } from "styled-components";
import { useTaskContext } from "../Task";

const StyledCheckboxHitbox = styled.label`
  aspect-ratio: 1/1;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  line-height: 0;
  font-size: 1.6rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  border-radius: 0.4rem;

  ${(props) => {
    const priority = props.$priority ?? 0;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      outline: 0.1rem solid var(--priority-${priority});
    `;
  }}
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
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
      {isCompleted && <MdDone />}
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
