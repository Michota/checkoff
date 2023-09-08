import { styled } from "styled-components";
import Task from "../components/Task";
import useTaskData from "../components/useTaskData";
import TaskDetails from "../components/TaskDetails";
import { useState } from "react";

const StyledTasksPanel = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: min-content 1fr;
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Tasks() {
  const { isLoading, tasks } = useTaskData();

  return (
    <StyledTasksPanel>
      <StyledChecklist>
        <h1>Checklist</h1>
      </StyledChecklist>
    </StyledTasksPanel>
  );
}

export default Tasks;
