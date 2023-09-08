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
  gap: 1rem;
`;

const Title = styled(Task.Title)`
  text-align: center;
  font-size: 2.4rem;
`;
const StyledDescription = styled.p``;

const Date = styled.input`
  margin-top: auto;
  align-self: self-start;
`;

function TaskDetails({ data, setState, setSelectedTaskId }) {
  return (
    <StyledTaskDetails>
      <Task data={data} key={data.id} setState={setState} renderType="compound">
        <Header>
          <Task.Checkbox></Task.Checkbox>
          <Title />
          <button onClick={() => setSelectedTaskId(null)}>X</button>
        </Header>
        <StyledDescription />
      </Task>
    </StyledTaskDetails>
  );
}

export default TaskDetails;
