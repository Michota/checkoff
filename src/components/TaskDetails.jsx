import { styled } from "styled-components";
import Box from "./Box";
import Task from "./Task";
import Button from "./ui/Button";
import { MdClose } from "react-icons/md";
import { useGeneralTasksContext } from "../contexts/GeneralTasksContext";

const StyledTaskDetails = styled(Box)`
  position: absolute;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  gap: 2rem;
  padding: 2rem 2rem 0 2rem;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: none;
  background-color: var(--theme-black-100);
  z-index: 2;
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

const TaskFooter = styled.footer`
  display: flex;
  width: 100%;
  height: 3.2rem;
  align-items: center;
  justify-content: space-between;
  z-index: 2; // ? above text
  gap: 5rem;
  position: sticky;
  bottom: 0;
  background-color: var(--theme-black-100);
  padding-bottom: 2rem;

  & > * {
    opacity: 0.4;
    transition: 300ms all;
  }

  & > *:hover {
    opacity: initial;
  }
`;

const CloseButton = styled(Button)`
  background-color: var(--theme-red);
  aspect-ratio: 1/1;
  width: 2.4rem;
  height: 2.4rem;
`;

function TaskDetails() {
  const { selectedTaskUUID, setSelectedTaskUUID } = useGeneralTasksContext();
  const { localData: tasks } = useGeneralTasksContext();

  const data = tasks?.find(
    (task) => (task?.uuid ?? task?.id) === selectedTaskUUID
  );

  if (!data?.id ?? data?.uuid ?? setSelectedTaskUUID(null)) return;

  return (
    <StyledTaskDetails className="TaskDetails">
      <Task data={data} key={data.id} renderType="compound">
        <Header>
          <Task.Checkbox />

          <Title />
          <CloseButton size="5rem" onClick={() => setSelectedTaskUUID(null)}>
            <MdClose />
          </CloseButton>
        </Header>
        {/* <DescriptionContainer> */}
        <Task.Description />
        {/* </DescriptionContainer> */}
        <TaskFooter>
          <span
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <span onClick={() => setSelectedTaskUUID(null)}>
              <Task.DeleteButton />
            </span>
            <Task.RestoreButton />
          </span>

          <Task.Priority />
          <Task.DateTime />
        </TaskFooter>
      </Task>
    </StyledTaskDetails>
  );
}

export default TaskDetails;
