import { styled } from "styled-components";
import Task from "../components/Task";
import useTaskData from "../components/useTaskData";
import TaskDetails from "../components/TaskDetails";
import { useState } from "react";
import useUpdateTask from "../components/useTaskUpdate";
import { useUpdateWithDebounce } from "../hooks/useUpdateWithDebounce";

const StyledTasksPanel = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: 1fr 4fr;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

function Tasks() {
  const { isLoading, tasksState, setTasksState } = useTaskData();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { updateTask, isUpdating } = useUpdateTask();
  const setUpdatedValue = useUpdateWithDebounce(updateTask, 1500);

  function handleSetTasksState(updatedTask) {
    const otherTasks = tasksState.filter((task) => task.id !== updatedTask.id);
    const index = tasksState.findIndex((task) => task.id === updatedTask.id);
    // * newly updated task is at the bottom...
    // setTasksState((tasksState) => [...otherTasks, updatedTask]);
    setTasksState((tasksState) => {
      return tasksState.map((task) =>
        task.id !== updatedTask.id ? task : updatedTask
      );
    });
    setUpdatedValue(updatedTask);
  }

  return (
    <StyledTasksPanel>
      <StyledChecklist>
        <h1>Checklist</h1>
        {isLoading
          ? "loading..."
          : tasksState?.map((task) => {
              // if (task.isCompleted)
              return (
                <Task
                  data={task}
                  key={task.id}
                  setState={handleSetTasksState}
                  setSelectedTaskId={setSelectedTaskId}
                />
              );
            })}
      </StyledChecklist>
      {selectedTaskId !== null && (
        <TaskDetails
          setState={handleSetTasksState}
          data={tasksState.find((task) => task.id === selectedTaskId)}
          setSelectedTaskId={setSelectedTaskId}
        />
      )}
    </StyledTasksPanel>
  );
}

export default Tasks;
