import useCreateNewTask from "../features/tasks/useCreateNewTask";
import Task from "./Task";
import Button from "../ui/Button";
import { MdAdd, MdDeleteSweep } from "react-icons/md";
import styled from "styled-components";
import useFilterWithParameters from "../hooks/useFilterWithParameters";
import useRemoveDeletedTasks from "../features/tasks/useRemoveDeletedTasks";
import { Tooltip } from "./Tooltip";
import { sortTasks } from "../utils/sortTasks";

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-width: 32rem;
  position: relative;
`;

const ButtonCreateTask = styled(Button)`
  border: none;
  background-color: var(--theme-green);
  color: var(--theme-black-200);
  position: fixed;
  bottom: 0;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  opacity: 50%;

  transform: translate(10rem, -100%);

  /* Overwrite Button deafult translate parameters */
  &:hover {
    transform: translate(10rem, -100%);
    opacity: 100%;
  }

  &:active {
    transform: translate(10rem, -100%);
  }

  .light-mode & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;
const ButtonDeleteAll = styled(ButtonCreateTask)`
  background-color: var(--theme-red);

  .light-mode & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;

// Default sorting setting. It must have the same name as the column in the database from which the data comes.
const defaultSorting = "createdAt";

function Checklist({ dataManager, location }) {
  const { createTask } = useCreateNewTask();
  const { cleanTrash } = useRemoveDeletedTasks();

  const { tasks, isLoadingTasks } = dataManager;
  const amITrashList = location.state?.trash === true ?? false;

  const sortingSettings = location?.state?.sortingOption;

  // Task filtered with search parameters.
  // ! descjson searching is currently not working due to JSON format of descriptions.
  const sortedTasks = sortingSettings?.option
    ? sortTasks(tasks, sortingSettings?.option, sortingSettings?.ascending)
    : sortTasks(tasks, defaultSorting, false);

  const filteredTasks = useFilterWithParameters(
    sortedTasks,
    ["title", "descjson"],
    "id",
    true
  );

  /* 
  Task rendering function. Depends on whether we are currently browsing removed tasks
  (inTrash property === true) it shows different tasks.
  */
  function renderTasks() {
    if (amITrashList)
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

      {!amITrashList ? (
        <>
          <ButtonCreateTask onClick={() => createTask()}>
            {/* Use Tooltip instead of tip-prop to fix positioning bug */}
            <Tooltip content={"Create new task"}>
              <MdAdd />
            </Tooltip>
          </ButtonCreateTask>
        </>
      ) : (
        <>
          <ButtonDeleteAll backgroundColor="red" onClick={() => cleanTrash()}>
            {/* Use Tooltip instead of tip-prop to fix positioning bug */}
            <Tooltip content={"Empty the trash!"}>
              <MdDeleteSweep />
            </Tooltip>
          </ButtonDeleteAll>
        </>
      )}
    </StyledChecklist>
  );
}

export default Checklist;
