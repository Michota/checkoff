import useCreateNewTask from "../services/useCreateNewTask";
import Task from "./Task";
import Button from "../ui/Button";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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

function Checklist({ dataManager, amITrash }) {
  const { createTask } = useCreateNewTask();
  const {
    tasks,
    isLoadingTasks,
    saveAndUpdateTask,
    selectedTaskId,
    setSelectedTaskId,
  } = dataManager;

  function renderTasks() {
    if (amITrash)
      return tasks?.map((task) => {
        if (task.inTrash)
          return (
            <Task
              data={task}
              key={task.id}
              setState={saveAndUpdateTask}
              setSelectedTaskId={setSelectedTaskId}
            />
          );
      });
    else
      return tasks?.map((task) => {
        if (!task.inTrash)
          return (
            <Task
              data={task}
              key={task.id}
              setState={saveAndUpdateTask}
              setSelectedTaskId={setSelectedTaskId}
            />
          );
      });
  }

  return (
    <StyledChecklist>
      {!isLoadingTasks && renderTasks()}

      {!amITrash && (
        <>
          <ButtonCreateTask onClick={() => createTask()}>
            <MdAdd />
          </ButtonCreateTask>
        </>
      )}
    </StyledChecklist>
  );
}

export default Checklist;
