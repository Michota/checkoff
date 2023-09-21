import { styled } from "styled-components";
import { useState } from "react";

import TaskDetails from "../components/TaskDetails";
import { useManageTaskData } from "../services/useManageTaskData";
import Checklist from "../components/Checklist";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

const StyledTasksPanel = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  height: 100%;
  overflow-y: auto;
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
  padding: 1rem;
`;

// const x = resolvePath("xyz", "tasks");
// console.log(x);

function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { taskIdURL } = useParams();
  const areWeInTrash = searchParams.has("trash");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { tasks, isLoadingTasks, saveAndUpdateTask } = useManageTaskData();

  return (
    <StyledTasksPanel>
      <MainSpace>
        {isLoadingTasks ? (
          <LoadingSpinner type="full" />
        ) : (
          <>
            <h2>{areWeInTrash ? "Trash" : "Checklist"}</h2>
            <Checklist
              dataManager={{
                tasks,
                isLoadingTasks,
                saveAndUpdateTask,
                selectedTaskId,
                setSelectedTaskId,
              }}
              amITrash={areWeInTrash}
            />
          </>
        )}
      </MainSpace>
      <SecondarySpace>
        {selectedTaskId !== null && (
          <TaskDetails
            setState={saveAndUpdateTask}
            data={tasks.find((task) => task.id === selectedTaskId)}
            setSelectedTaskId={setSelectedTaskId}
          />
        )}
      </SecondarySpace>
    </StyledTasksPanel>
  );
}

export default Tasks;
