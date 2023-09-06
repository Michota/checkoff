import { styled } from "styled-components";
import Box from "../ui/Box";
import Task from "./Task";

const StyledTaskDetails = styled(Box)`
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  text-align: center;
  font-size: 2.8rem;
`;
const StyledDescription = styled.p``;

const Date = styled.input`
  margin-top: auto;
  align-self: self-start;
`;

function TaskDetails({ task }) {
  const { id, title, description, startDate, endDate, isCompleted, priority } =
    task;

  return (
    <StyledTaskDetails>
      <Task task={task} type="compound">
        <Header>
          <Task.Checkbox></Task.Checkbox>
          <Task.Title></Task.Title>
          <span>X</span>
        </Header>
        <StyledDescription>{description}</StyledDescription>
        <Date defaultValue={startDate} type="date" />
      </Task>
    </StyledTaskDetails>
  );
}

export default TaskDetails;
