import { createContext, useContext, useState } from "react";
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
  font-size: 1.8rem;
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

const StyledCheckbox = styled.button`
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

/*
TODO: npm date-picker, zmień wyświetlany tekst daty na Tommorow, Yesterday, in Monday etc.
!
*/

const TaskContext = createContext();

function Task({ children, task, onClick, type }) {
  const {
    id,
    isCompleted,
    title,
    priority,
    description,
    startDate,
    endDate,
    status,
  } = task;

  const { updateTask, isUpdating } = useUpdateTask();

  if (!type || type === "tab") {
    return (
      <TaskContext.Provider value={{ task, ...task, updateTask, isUpdating }}>
        <StyledTask onClick={onClick}>
          <Checkbox />
          <StyledDetails>
            <Title />
            <Description />
            {startDate && (
              <StyledDateStart>
                📅 {new Date(startDate).toLocaleDateString()}
              </StyledDateStart>
            )}
          </StyledDetails>
        </StyledTask>
      </TaskContext.Provider>
    );
  }

  if (type === "compound") {
    return (
      <>
        <TaskContext.Provider value={{ ...task, updateTask, isUpdating }}>
          {children}
        </TaskContext.Provider>
      </>
    );
  }
}

function Checkbox() {
  const { isUpdating, updateTask, id, isCompleted, priority, task } =
    useContext(TaskContext);
  return (
    <StyledCheckbox
      onClick={() => updateTask(task)}
      $priority={priority}
      $isCompleted={isCompleted}
    ></StyledCheckbox>
  );
}

function Title({ className }) {
  const { task, title } = useContext(TaskContext);

  const isEmpty = title === "" || !title;

  return (
    <StyledTitle
      className={className}
      $isEmpty={isEmpty}
      defaultValue={title}
      placeholder="This task has no name..."
    />
  );
}

function Description() {
  const { description } = useContext(TaskContext);

  return (
    <>
      {description && (
        <StyledDescription>
          {description.length > 32 ? stringShortener(description) : description}
        </StyledDescription>
      )}
    </>
  );
}

Task.Checkbox = Checkbox;
Task.Title = Title;
Task.Description = Description;

export default Task;
