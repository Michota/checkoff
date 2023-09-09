import { styled } from "styled-components";
import Task from "../components/Task";
import useTaskData from "../components/useTaskData";
import TaskDetails from "../components/TaskDetails";
import { useEffect, useState } from "react";
import useUpdateTask from "../components/useTaskUpdate";
import { useDebounce } from "../hooks/useDebounce";

const StyledTasksPanel = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: min-content 1fr;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Tasks() {
  const { isLoading, tasksState, setTasksState } = useTaskData();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { updateTask, isUpdating } = useUpdateTask();
  const debounce = useDebounce(tasksState, 5000);

  useEffect(
    function () {
      if (!selectedTaskId) return;
      if (debounce)
        updateTask(
          debounce?.find((task) => task.id === selectedTaskId ?? undefined)
        );
    },
    [debounce, selectedTaskId, updateTask]
  );

  async function handleSetTasksState(updatedTask) {
    const otherTasks = tasksState.filter((task) => task.id !== updatedTask.id);
    const index = tasksState.findIndex((task) => task.id === updatedTask.id);
    // * newly updated task is at the bottom...
    // setTasksState((tasksState) => [...otherTasks, updatedTask]);
    setTasksState((tasksState) => {
      return tasksState.map((task) =>
        task.id !== updatedTask.id ? task : updatedTask
      );
    });
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
