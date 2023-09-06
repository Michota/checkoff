import { styled } from "styled-components";
import Task from "../components/Task";
import useTaskData from "../components/useTaskData";
import Box from "../ui/Box";
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
  const { isLoading, id, tasks } = useTaskData();
  const [selectedTask, setSelectedTask] = useState(null);

  function handleSetSelectedTask(taskData) {
    setSelectedTask(taskData);
  }

  return (
    <StyledTasksPanel>
      <StyledChecklist>
        <h1>Checklist</h1>
        {isLoading
          ? "loading..."
          : tasks.map((task) => {
              // if (task.isCompleted)
              return (
                <Task
                  task={task}
                  key={task.id}
                  onClick={() => handleSetSelectedTask(task)}
                />
              );
            })}
      </StyledChecklist>
      {selectedTask && <TaskDetails task={selectedTask} />}
    </StyledTasksPanel>
  );
}

export default Tasks;
