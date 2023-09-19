import { createContext, useContext, useEffect, useState } from "react";
import { styled, css } from "styled-components";
import useTaskDelete from "../services/useTaskDelete";

import Box from "../ui/Box";

import DeleteButton from "./TaskChilds/DeleteButton";
import Checkbox from "./TaskChilds/Checkbox";
import Title from "./TaskChilds/Title";
import { Description } from "./TaskChilds/Description";
import { DateTime } from "./TaskChilds/DateTime";
import RestoreButton from "./TaskChilds/RestoreButton";

// Styling components with StyledComponents

const StyledTask = styled(Box)`
  overflow-y: hidden;
  cursor: pointer;
  width: 30rem;
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
  ${(props) =>
    props.$inTrash === true &&
    css`
      border-bottom: var(--theme-darkred-250) 2px solid;
    `}
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
  const amICompound = renderType === "compound";

  // * Managing data
  const { deleteTask } = useTaskDelete();
  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  // * Data (value atr.) for TaskContext.Provider
  const valueProvider = { ...data, updateState, renderType, deleteTask };

  return (
    <TaskContext.Provider value={valueProvider}>
      {!amICompound && (
        <StyledTask
          $inTrash={data.inTrash}
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
                  display: "grid",
                  gridTemplateColumns: "8rem 1fr",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <Description />
                <DateTime />
              </span>
            </StyledDetails>
          </TaskFlexContainer>
          <DeleteButton />
          <RestoreButton />
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
Task.RestoreButton = RestoreButton;

export default Task;
export { useTaskContext };
