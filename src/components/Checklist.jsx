import useCreateNewTask from "../features/tasks/useCreateNewTask";
import Task from "./Task";
import Button from "../ui/Button";
import { MdAdd, MdDeleteSweep } from "react-icons/md";
import styled from "styled-components";
import useFilterWithParameters from "../hooks/useFilterWithParameters";
import useRemoveDeletedTasks from "../features/tasks/useRemoveDeletedTasks";

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

  .light-mode & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;
const ButtonDeleteAll = styled(Button)`
  border: none;
  background-color: var(--theme-red);
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

  .light-mode & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;

// Sorting function
function sortTasks(tasks, sortBy, ascending = true) {
  let method = typeof tasks?.[0][sortBy];
  let sortedTasks;

  if (sortBy === "startDate") {
    sortedTasks = ascending
      ? tasks?.sort(
          (b, a) =>
            new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        )
      : tasks?.sort(
          (a, b) =>
            new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        );
    return sortedTasks;
  }

  if (method === "number")
    sortedTasks = ascending
      ? tasks?.sort((b, a) => a[sortBy] - b[sortBy])
      : tasks?.sort((a, b) => a[sortBy] - b[sortBy]);
  // Sort by strings.
  if (method === "string")
    sortedTasks = ascending
      ? tasks.sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
            ? -1
            : b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
            ? 1
            : 0
        )
      : tasks.sort((b, a) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
            ? -1
            : b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
            ? 1
            : 0
        );

  // if there are no sortedTasks (length === 0), return non-sorted array.
  return sortedTasks || tasks;
}

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
            <MdAdd />
          </ButtonCreateTask>
        </>
      ) : (
        <>
          <ButtonDeleteAll backgroundColor="red" onClick={() => cleanTrash()}>
            <MdDeleteSweep />
          </ButtonDeleteAll>
        </>
      )}
    </StyledChecklist>
  );
}

export default Checklist;
