import { createContext, useContext } from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";
import { MdDone } from "react-icons/md";

import Box from "../ui/Box";

const StyledTask = styled(Box)`
  cursor: pointer;
  width: 100%;
  gap: 1rem;
  align-items: center;
  transition: transform 100ms;

  &:active {
    transform: scale(98%);
  }

  ${(props) =>
    props.$isCompleted === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          color: var(--theme-white-100);
          background-color: var(--theme-black-250);
        `};
`;

const StyledDescription = styled.p`
  font-size: 1.2rem;
`;

const StyledDetails = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const StyledTitle = styled.input`
  width: 100%;
  font-size: 1.6rem;
  // ? Remove in future if react-icons will work properly
  /* opacity: ${(props) =>
    props.$isEmpty === true
      ? css`
          30%;
        `
      : css`
          initial;
        `}; */
`;

const StyledDateStart = styled.p`
  font-size: 1.4rem;
`;

const StyledCheckboxHitbox = styled.label`
  aspect-ratio: 1/1;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  line-height: 0;
  font-size: 1.6rem;

  /* &::after {
    ${(props) => {
    const isCompleted = props.$isCompleted;
    if (isCompleted)
      return css`
        content: "✓";
      `;
  }}
  } */

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
      border: 0.2rem solid var(--priority-${priority});
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

const TaskContext = createContext();

function Task({
  children,
  data,
  setSelectedTaskId,
  setState,
  renderType = "tab",
}) {
  const valueProvider = { ...data, updateState, renderType };

  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  return (
    <TaskContext.Provider value={valueProvider}>
      {renderType === "tab" && (
        <StyledTask
          $isCompleted={data.isCompleted}
          onClick={() => setSelectedTaskId(data.id)}
        >
          <Checkbox />
          <StyledDetails>
            <Title />
            <Description />
          </StyledDetails>
        </StyledTask>
      )}
      {renderType === "compound" && <>{children}</>}
    </TaskContext.Provider>
  );
}

function Checkbox({ className }) {
  const { priority, isCompleted, updateState } = useContext(TaskContext);

  return (
    <StyledCheckboxHitbox
      className={className}
      $priority={priority}
      $isCompleted={isCompleted}
    >
      {isCompleted && <MdDone />}
      <HiddenCheckbox
        aria-checked={isCompleted}
        onClick={(e) => updateState("isCompleted", !isCompleted)}
      />
    </StyledCheckboxHitbox>
  );
}

function Title({ className }) {
  const { title, updateState } = useContext(TaskContext);

  const isEmpty = title === "" || !title;

  return (
    <StyledTitle
      onChange={(e) => updateState("title", e.target.value)}
      value={title}
      className={className}
      $isEmpty={isEmpty}
      placeholder="This task has no name..."
    />
  );
}

function Description({ className }) {
  const { description, updateState, renderType } = useContext(TaskContext);
  return (
    <>
      {description && renderType === "tab" && (
        <StyledDescription>
          {description.length > 32 ? stringShortener(description) : description}
        </StyledDescription>
      )}
      {renderType === "compound" && (
        <textarea
          placeholder="Enter description here..."
          className={className}
          value={description}
          onChange={(e) => updateState("description", e.target.value)}
        />
      )}
    </>
  );
}

Task.Checkbox = Checkbox;
Task.Title = Title;
Task.Description = Description;

export default Task;
