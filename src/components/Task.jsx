import { createContext, useContext, useEffect, useState } from "react";
import { styled, css } from "styled-components";
import { MdDeleteForever, MdDone } from "react-icons/md";
import useTaskDelete from "../services/useTaskDelete";

import Box from "../ui/Box";

import DeleteButton from "./TaskChilds/DeleteButton";
import Checkbox from "./TaskChilds/Checkbox";
import Title from "./TaskChilds/Title";
import { Description } from "./TaskChilds/Description";
import { DateTime } from "./TaskChilds/DateTime";

// Styling components with StyledComponents

const StyledTask = styled(Box)`
  overflow-y: hidden;
  cursor: pointer;
  min-width: 30rem;
  width: max-content;
  min-height: 7rem;
  height: fit-content;
  transition: transform 100ms;
  justify-content: space-between;

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

const TaskFlexContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0.2rem;
`;

const StyledDetails = styled.span`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

// End of Styling with StyledComponents

const TaskContext = createContext();

function useTaskContext() {
  const value = useContext(TaskContext);
  if (value === undefined)
    throw new Error("Value in task context was undefined.");
  return value;
}

// * Main Component
function Task({
  children,
  data,
  setSelectedTaskId,
  setState,
  renderType = "tab",
}) {
  const { deleteTask } = useTaskDelete();
  const valueProvider = { ...data, updateState, renderType, deleteTask };
  const amICompound = renderType === "compound";

  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  return (
    <TaskContext.Provider value={valueProvider}>
      {!amICompound && (
        <StyledTask
          $isCompleted={data.isCompleted}
          onClick={(e) => {
            // ? StopPropagation on all the child components
            // if (e.currentTarget !== e.target) return;
            setSelectedTaskId(data.id);
          }}
        >
          <TaskFlexContainer>
            <Checkbox />
            <StyledDetails>
              <Title />
              {/* span-element created for styling reasons only */}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <Description />
                <DateTime />
              </span>
            </StyledDetails>
          </TaskFlexContainer>
          <DeleteButton />
        </StyledTask>
      )}
      {/* Render task as compound component */}
      {amICompound && <>{children}</>}
    </TaskContext.Provider>
  );
}

// Compound Component Children as properties
Task.Checkbox = Checkbox;
Task.Title = Title;
Task.Description = Description;
Task.DeleteButton = DeleteButton;
Task.DateTime = DateTime;

export default Task;
export { useTaskContext };
