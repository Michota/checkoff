import { createContext, useContext, useReducer } from "react";
import { styled, css } from "styled-components";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import useTaskDelete from "../features/tasks/useTaskDelete";
import Box from "./Box";
import DeleteButton from "./TaskChilds/DeleteButton";
import Checkbox from "./TaskChilds/Checkbox";
import Title from "./TaskChilds/Title";
import { Description } from "./TaskChilds/Description";
import { DateTime } from "./TaskChilds/DateTime";
import RestoreButton from "./TaskChilds/RestoreButton";
import Priority from "./TaskChilds/Priority";
import EditorComponent from "./EditorComponent";
import { useLocalTasksState } from "../features/tasks/useLocalTasksState";

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
    props.$isCompleted === true
      ? css`
          .light-theme & {
            color: var(--theme-white-300);
            background-color: var(--theme-black-300);
          }
        `
      : css`
          .light-theme & {
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

// This reducer is changing data in task locally

// function reducer(state, action) {
//   switch (action.type) {
//     case "task/update":
//       // Update task data
//       if (action.payload.columnName !== "bothDate")
//         return {
//           ...state,
//           [action.payload.columnName]: action.payload.newData,
//         };
// Update task data, but both startDate and endDate at same time
//       return {
//         ...state,
//         startDate: action.payload.newData[0],
//         endDate: action.payload.newData[1],
//       };
//   }
// }

// Every task has its own context!
const TaskContext = createContext();
function useTaskContext() {
  const value = useContext(TaskContext);
  if (value === undefined)
    throw new Error("Value in task context was undefined.");
  return value;
}

// * Main Component
function Task({ children, data, renderType = "tab" }) {
  // * Updating data by overwriting old data with new data in selected column.
  // It should be named "updateTask", but name remains unchanged for backwards compability reasons.
  const { localDispatcher: dispatch } = useGeneralTasksProvider();
  function updateState(columnName, newColumnData) {
    // Update task data
    if (columnName !== "bothDate")
      dispatch({
        type: "tasks/updateTask",
        payload: { ...data, [columnName]: newColumnData },
      });
    // Update task data, but both startDate and endDate at same time
    else
      dispatch({
        type: "tasks/updateTask",
        payload: {
          ...data,
          startDate: newColumnData[0],
          endDate: newColumnData[1],
        },
      });
  }

  function deleteTask(taskId) {
    dispatch({
      type: "tasks/deleteTask",
      payload: taskId,
    });
  }

  // * Data (value atr.) for TaskContext.Provider
  const valueProvider = {
    ...data,
    updateState,
    renderType,
    deleteTask,
  };

  const { setSelectedTaskId } = useGeneralTasksProvider();

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
Task.Description = EditorComponent;
Task.DeleteButton = DeleteButton;
Task.DateTime = DateTime;
Task.RestoreButton = RestoreButton;
Task.Priority = Priority;

export default Task;
export { useTaskContext };
