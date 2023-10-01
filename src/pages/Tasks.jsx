import { styled } from "styled-components";

import TaskDetails from "../components/TaskDetails";
import Checklist from "../components/Checklist";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";

const StyledTasksPanel = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  height: 100%;
  /* overflow-y: auto; */
`;

const MainSpace = styled.div`
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

const SecondarySpace = styled.div`
  position: relative;
  margin: 2rem;
  & .TaskDetails {
    box-shadow: var(--drop-shadow);
  }
`;

// const x = resolvePath("xyz", "tasks");
// console.log(x);

function Tasks() {
  // Decide whether to render Tasks or deleted tasks.
  const location = useLocation();
  const areWeInTrash = location.state?.trash === true ?? false;

  // const { tasks, isLoadingTasks, saveAndUpdateTask } = useManageTaskData();

  const { selectedTaskId, tasks, isLoadingTasks } = useGeneralTasksProvider();

  return (
    <StyledTasksPanel>
      <MainSpace>
        <SearchBar mode="url" searchParameters={["title"]} />
        {isLoadingTasks ? (
          <LoadingSpinner type="full" />
        ) : (
          <>
            <h2>{areWeInTrash ? "Trash" : "Checklist"}</h2>
            <Checklist
              // key={}
              dataManager={{
                tasks,
                isLoadingTasks,
              }}
              amITrash={areWeInTrash}
            />
          </>
        )}
      </MainSpace>
      <SecondarySpace>{selectedTaskId && <TaskDetails />}</SecondarySpace>
    </StyledTasksPanel>
  );
}

export default Tasks;
