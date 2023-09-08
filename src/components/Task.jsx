import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";
import useUpdateTask from "./useTaskUpdate";
import Box from "../ui/Box";
// import Checkbox from "./Checkbox";

const StyledTask = styled(Box)`
  cursor: pointer;
  width: 28rem;
  gap: 1rem;
  align-items: center;

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

const StyledCheckbox = styled.label`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isCompleted ? `var(--theme-white-100)` : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  ${(props) => {
    const priority = props.$priority ?? 0;
    return `
    border: 0.1rem solid var(--priority-${priority});
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

// StyledCheckbox.defaultProps = {
//   type: "checkbox",
// };

/*
TODO: npm date-picker, zmień wyświetlany tekst daty na Tommorow, Yesterday, in Monday etc.
!
*/

// // * reducer
// function reducer(state, action) {
//   console.log(action);
//   switch (action.type) {
//     case "updateTitle":
//       return { ...state, title: action.payload };
//     case "updateCheckbox":
//       return { ...state, isCompleted: action.payload };
//   }
// }
const TaskContext = createContext();

function Task({
  children,
  data,
  setSelectedTaskId,
  setState,
  renderType = "tab",
}) {
  // const [taskData, dispatch] = useReducer(reducer, data);

  const valueProvider = { ...data, updateState, renderType };

  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  return (
    <TaskContext.Provider value={valueProvider}>
      {renderType === "tab" && (
        <StyledTask onClick={() => setSelectedTaskId(data.id)}>
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

function Checkbox() {
  const { priority, isCompleted, updateState } = useContext(TaskContext);

  return (
    <StyledCheckbox $priority={priority} $isCompleted={isCompleted}>
      <HiddenCheckbox
        aria-checked={isCompleted}
        onClick={(e) => updateState("isCompleted", !isCompleted)}
      />
    </StyledCheckbox>
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

function Description() {
  const { description, updateState, renderType } = useContext(TaskContext);

  return (
    <>
      {description && renderType === "tab" && (
        <StyledDescription>
          {description.length > 32 ? stringShortener(description) : description}
        </StyledDescription>
      )}
      {description && renderType === "compound" && (
        <input
          value={description}
          onChange={(e) => updateState("title", e.target.value)}
        />
      )}
    </>
  );
}

Task.Checkbox = Checkbox;
Task.Title = Title;
Task.Description = Description;

export default Task;
