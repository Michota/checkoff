import { styled } from "styled-components";
import Task from "../components/Task";
import useTaskData from "../components/useTaskData";
import TaskDetails from "../components/TaskDetails";
import { useEffect, useState } from "react";
import useUpdateTask from "../components/useTaskUpdate";
import { useUpdateWithDebounce } from "../hooks/useUpdateWithDebounce";
import Button from "../ui/Button";
import useCreateNewTask from "../components/useCreateNewTask";

const StyledTasksPanel = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: 1fr 4fr;
  height: 100%;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

let myTimeout;

const debounce = (callback, instantClearTimeout) => {
  if (myTimeout) {
    clearTimeout(myTimeout);
  }

  if (instantClearTimeout) {
    callback();
  }

  myTimeout = setTimeout(() => {
    callback();
  }, 1500);
};

let currentlyUpdatedTask;

function Tasks() {
  const { isLoading, tasksState, setTasksState } = useTaskData();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { updateTask, isUpdating } = useUpdateTask();
  const { createTask } = useCreateNewTask();

  function handleSetTasksState(updatedTask) {
    setTasksState((tasksState) => {
      return tasksState.map((task) =>
        task.id !== updatedTask.id ? task : updatedTask
      );
    });

    const isCurrentlyUpdating = currentlyUpdatedTask?.id !== updatedTask?.id;
    debounce(() => {
      if (currentlyUpdatedTask?.id) updateTask(currentlyUpdatedTask);
    }, isCurrentlyUpdating);
    currentlyUpdatedTask = updatedTask;
  }

  return (
    <StyledTasksPanel>
      <StyledChecklist>
        <h1>Checklist</h1>
        {!isLoading &&
          tasksState?.map((task) => {
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

        <Button onClick={() => createTask()} $floating={true} type="add">
          +
        </Button>
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
