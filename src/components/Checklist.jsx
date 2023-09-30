import useCreateNewTask from "../features/tasks/useCreateNewTask";
import Task from "./Task";
import Button from "../ui/Button";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import useFilterWithParameters from "../hooks/useFilterWithParameters";

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
  position: sticky;
  bottom: 2rem;
  left: 100%;
  opacity: 50%;
  transition: all 200ms;
  &:hover {
    opacity: 100;
  }
`;

function Checklist({ dataManager, amITrash }) {
  const { createTask } = useCreateNewTask();
  const { tasks, isLoadingTasks } = dataManager;

  // Task filtered with search parameters.
  // ! descjson searching is currently not working due to JSON format of descriptions.
  const filteredTasks = useFilterWithParameters(
    tasks,
    ["title", "descjson"],
    "id",
    true
  );

  function renderTasks() {
    if (amITrash)
      return filteredTasks?.map((task) => {
        if (task.inTrash) return <Task data={task} key={task.id} />;
      });
    else
      return filteredTasks?.map((task) => {
        if (!task.inTrash) return <Task data={task} key={task.id} />;
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
