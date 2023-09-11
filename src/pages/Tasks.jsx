import { styled } from "styled-components";
import { useState } from "react";

import useTaskData from "../services/useTaskData";
import useUpdateTask from "../services/useTaskUpdate";
import useCreateNewTask from "../services/useCreateNewTask";

import TaskDetails from "../components/TaskDetails";
import Task from "../components/Task";
import Button from "../ui/Button";
import { MdAdd } from "react-icons/md";

const StyledTasksPanel = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  height: 100%;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

const ButtonCreateTask = styled(Button)`
  border: none;
  background-color: var(--theme-green);
  color: var(--theme-black-200);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 0;
  right: 0;
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

        <ButtonCreateTask onClick={() => createTask()}>
          <MdAdd />
        </ButtonCreateTask>
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
