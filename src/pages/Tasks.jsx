import { styled } from "styled-components";
import { useState } from "react";

import useTaskData from "../services/useTaskData";
import useUpdateTask from "../services/useTaskUpdate";
import useCreateNewTask from "../services/useCreateNewTask";

import TaskDetails from "../components/TaskDetails";
import Task from "../components/Task";
import Button from "../ui/Button";
import { MdAdd } from "react-icons/md";
import { useManageTaskData } from "../services/useManageTaskData";

const StyledTasksPanel = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  height: 100%;
  overflow-y: auto;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: max-content;
  padding: 0 1rem 0 2rem;
`;

const ButtonCreateTask = styled(Button)`
  border: none;
  background-color: var(--theme-green);
  color: var(--theme-black-200);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 2rem;
  right: 0;
  opacity: 50%;
  transition: all 200ms;
  &:hover {
    opacity: 100;
  }
`;

const TaskDetailsContainer = styled.div`
  padding: 1rem;
`;

function Tasks() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { createTask } = useCreateNewTask();
  const { tasks, isLoadingTasks, saveAndUpdateTask } = useManageTaskData();

  return (
    <StyledTasksPanel>
      <StyledChecklist>
        <h1>Checklist</h1>
        {!isLoadingTasks &&
          tasks?.map((task) => {
            // if (task.isCompleted)
            return (
              <Task
                data={task}
                key={task.id}
                setState={saveAndUpdateTask}
                setSelectedTaskId={setSelectedTaskId}
              />
            );
          })}

        <ButtonCreateTask onClick={() => createTask()}>
          <MdAdd />
        </ButtonCreateTask>
      </StyledChecklist>
      <TaskDetailsContainer>
        {selectedTaskId !== null && (
          <TaskDetails
            setState={saveAndUpdateTask}
            data={tasks.find((task) => task.id === selectedTaskId)}
            setSelectedTaskId={setSelectedTaskId}
          />
        )}
      </TaskDetailsContainer>
    </StyledTasksPanel>
  );
}

export default Tasks;
