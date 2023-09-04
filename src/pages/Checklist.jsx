import { styled } from "styled-components";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../services/tasksAPI";

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Checklist() {
  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksData,
  });

  return (
    <StyledChecklist>
      <h1>Checklist</h1>
      {isLoading
        ? "loading..."
        : tasks.map((task) => {
            if (!task.isCompleted) return <Task task={task} key={task.id} />;
          })}
      <h2>Done</h2>
    </StyledChecklist>
  );
}

export default Checklist;
