import { createContext, useContext } from "react";
import { styled, css } from "styled-components";
import useTaskDelete from "../features/tasks/useTaskDelete";

import Box from "../ui/Box";

import DeleteButton from "./TaskChilds/DeleteButton";
import Checkbox from "./TaskChilds/Checkbox";
import Title from "./TaskChilds/Title";
import { Description } from "./TaskChilds/Description";
import { DateTime } from "./TaskChilds/DateTime";
import RestoreButton from "./TaskChilds/RestoreButton";
import Priority from "./TaskChilds/Priority";
import EditorComponent from "./EditorComponent";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";

// Styling components with StyledComponents

const TaskFlexContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0.2rem;
`;

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
    props.$isCompleted === true
      ? css`
          .light-mode & {
            color: var(--theme-white-300);
            background-color: var(--theme-black-300);
          }
        `
      : css`
          .light-mode & {
            color: var(--theme-white-100);
            background-color: var(--theme-black-200);
          }
        `};
  ${(props) =>
    props.$inTrash === true &&
    css`
      border-bottom: var(--theme-darkred-250) 2px solid;
    `}
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
function Task({ children, data, renderType = "tab" }) {
  const { saveAndUpdateTask } = useGeneralTasksProvider();
  // * Managing data
  const { deleteTask } = useTaskDelete();
  function updateState(columnName, newData) {
    if (columnName !== "bothDate")
      saveAndUpdateTask({ ...data, [columnName]: newData });
    // update startDate and endDate
    else
      saveAndUpdateTask({
        ...data,
        startDate: newData[0],
        endDate: newData[1],
      });
  }

  // * Data (value atr.) for TaskContext.Provider
  const valueProvider = { ...data, updateState, renderType, deleteTask };

  const { taskId, setSelectedTaskId } = useGeneralTasksProvider();

  return (
    <TaskContext.Provider value={valueProvider}>
      {renderType !== "compound" && (
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
      {renderType === "compound" && <>{children}</>}
    </TaskContext.Provider>
  );
}

// Compound Component Children as properties
Task.Checkbox = Checkbox;
Task.Title = Title;
// ! CHANGED FOR TESTING PURPOSES!
// Task.Description = Description;
Task.Description = EditorComponent;
Task.DeleteButton = DeleteButton;
Task.DateTime = DateTime;
Task.RestoreButton = RestoreButton;
Task.Priority = Priority;

export default Task;
export { useTaskContext };
