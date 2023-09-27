import { styled } from "styled-components";
import Box from "../ui/Box";
import Task from "./Task";
import Button from "../ui/Button";
import { MdClose } from "react-icons/md";
import { useSelectedTaskContext } from "../contexts/selectedTaskContext";
import { useManageTaskData } from "../features/tasks/useManageTaskData";

const StyledTaskDetails = styled(Box)`
  position: absolute;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
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
// const Description = styled(Task.Description)`
//   background-color: transparent;
//   color: var(--theme-white-100);
//   overflow: auto;
//   width: min-content;
//   height: 100%;
//   font-size: 2rem;
//   border: 0;
//   resize: none;
// `;

// const DescriptionContainer = styled.label`
//   width: 100%;
//   height: auto;
//   overflow-y: hidden;
//   flex: 1;
// `;

const Date = styled.input`
  margin-top: auto;
  align-self: self-start;
`;

const TaskFooter = styled.footer`
  display: flex;
  width: 100%;
  height: 3.2rem;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled(Button)`
  background-color: var(--theme-red);
  aspect-ratio: 1/1;
  width: 2.4rem;
  height: 2.4rem;
`;

// const tempData = {
// blocks: [
//   {
//     type: "paragraph",
//     data: {
//       text: "",
//       level: 1,
//     },
//   },
// ],
// };

function TaskDetails() {
  const {
    taskId: selectedTaskId,
    setTaskId: setSelectedTaskId,
    saveAndUpdateTask,
    tasks,
  } = useSelectedTaskContext();

  const data = tasks?.find((task) => task.id === selectedTaskId);
  if (!data?.id ?? setSelectedTaskId(null)) return;
  return (
    <StyledTaskDetails>
      <Task
        data={data}
        key={data.id}
        setState={saveAndUpdateTask}
        renderType="compound"
      >
        <Header>
          <Task.Checkbox />

          <Title />
          <CloseButton size="5rem" onClick={() => setSelectedTaskId(null)}>
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
            <span onClick={() => setSelectedTaskId(null)}>
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
