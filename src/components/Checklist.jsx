import Task from "./Task";
import styled from "styled-components";
import useFilterWithParameters from "../hooks/useFilterWithParameters";
import { sortTasks } from "../utils/sortTasks";
import { ButtonCreateTask } from "./ButtonCreateTask";
import { ButtonDeleteAll } from "./ButtonDeleteAll";

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-width: 32rem;
  position: relative;
`;

// Default sorting setting. It must have the same name as the column in the database from which the data comes.
const defaultSorting = "createdAt";

function Checklist({ dataManager, location }) {
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

      {!amITrashList ? <ButtonCreateTask /> : <ButtonDeleteAll />}
    </StyledChecklist>
  );
}

export default Checklist;
