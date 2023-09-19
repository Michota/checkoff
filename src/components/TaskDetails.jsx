import { styled } from "styled-components";
import Box from "../ui/Box";
import Task from "./Task";
import Button from "../ui/Button";
import { MdClose } from "react-icons/md";

const StyledTaskDetails = styled(Box)`
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  height: 100%;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled(Task.Title)`
  text-align: center;
  font-size: 2.8rem;
`;
const Description = styled(Task.Description)`
  background-color: transparent;
  color: var(--theme-white-100);
  overflow: auto;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  border: 0;
  resize: none;
`;

const DescriptionContainer = styled.label`
  width: 100%;
  height: auto;
  overflow-y: hidden;
  flex: 1;
`;

const Date = styled.input`
  margin-top: auto;
  align-self: self-start;
`;

const TaskFooter = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

function TaskDetails({ data, setState, setSelectedTaskId }) {
  if (!data?.id ?? setSelectedTaskId(null)) return;
  return (
    <StyledTaskDetails>
      <Task data={data} key={data.id} setState={setState} renderType="compound">
        <Header>
          <Task.Checkbox />
          <Title />
          <Button
            backgroundColor={"var(--theme-red)"}
            onClick={() => setSelectedTaskId(null)}
          >
            <MdClose />
          </Button>
        </Header>
        <DescriptionContainer>
          <Description />
        </DescriptionContainer>
        <TaskFooter>
          <span onClick={() => setSelectedTaskId(null)}>
            <span
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <Task.DeleteButton />
              <Task.RestoreButton />
            </span>
          </span>
          <Task.DateTime />
        </TaskFooter>
      </Task>
    </StyledTaskDetails>
  );
}

export default TaskDetails;
