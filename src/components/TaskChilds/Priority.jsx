import styled, { css } from "styled-components";
import { useTaskContext } from "../Task";

const StyledSlider = styled.input.attrs({ type: "range", max: 3 })`
  overflow: hidden;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-radius: 1.5rem;
  height: 0.6rem;
  background: var(--theme-white-400);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 2rem;
    width: 2rem;
    ${(props) =>
      `
        background-color: var(--priority-${props.$priority});
      `};

    border-radius: 50%;
    border: none;
    transition: 0.2s ease-in-out;
    box-shadow: -500rem 0 0 500rem
      ${(props) => `var(--priority-${props.$priority})`};
  }
`;

const StyledPriorty = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;

  & p::selection {
    background-color: transparent;
    color: inherit;
  }
  width: 100%;

  min-width: 15rem;
  max-width: 50rem;
`;

function Priority({ sliderOnly }) {
  const { priority, isCompleted, updateState } = useTaskContext();

  function priorityString(p) {
    switch (Number(p)) {
      case 0:
        return "Priorty not set 🤔";
      case 1:
        return "Priority: Low 😎";
      case 2:
        return "Priority: Medium 😐";
      case 3:
        return "Priority: High 😱";
    }
  }

  if (sliderOnly)
    return (
      <StyledSlider
        max={3}
        $priority={Number(priority)}
        value={priority}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          updateState("priority", e.target.value);
        }}
      />
    );

  let localPriority = priority;
  // :)

  return (
    <StyledPriorty>
      <p style={{ fontSize: "0.9em", position: "absolute", top: -15 }}>
        {priorityString(localPriority)}
      </p>
      <StyledSlider
        $priority={Number(priority)}
        value={priority}
        onChange={(e) => {
          localPriority = e.target.value;
          e.preventDefault();
          e.stopPropagation();
          updateState("priority", e.target.value);
        }}
      />
    </StyledPriorty>
  );
}

export default Priority;
