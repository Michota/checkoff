import { styled } from "styled-components";
import { useState } from "react";

import TaskDetails from "../components/TaskDetails";
import { useManageTaskData } from "../features/tasks/useManageTaskData";
import Checklist from "../components/Checklist";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { useSelectedTaskContext } from "../contexts/selectedTaskContext";

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
`;

// const x = resolvePath("xyz", "tasks");
// console.log(x);

function Tasks() {
  // Decide whether to render Tasks or deleted tasks.
  const location = useLocation();
  const areWeInTrash = location.state === "trash";

  // const { tasks, isLoadingTasks, saveAndUpdateTask } = useManageTaskData();

  const {
    taskId: selectedTaskId,
    tasks,
    isLoadingTasks,
    saveAndUpdateTask,
  } = useSelectedTaskContext();

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
                saveAndUpdateTask,
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
