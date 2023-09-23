import styled, { css } from "styled-components";
import Box from "../ui/Box";
import Task from "./Task";
import useTaskData from "../features/tasks/useTaskData";

const StyledEvent = styled(Box)`
  background-color: var(--theme-black-250);
  width: 100%;
  height: min-content;
  font-size: 1.2rem;
  padding: 0.4em;

  ${(props) =>
    props.$isCompleted === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          color: var(--theme-white-100);
          background-color: var(--theme-black-250);
        `};
`;

// function CallendarEvent({ children, data }) {
//   const { timeText, event } = data;
//   const { id, title, extendedProps } = event;
//   const { isCompleted } = extendedProps;
//   return (
//     <StyledEvent $isCompleted={isCompleted}>
//       <p>{isCompleted && "i am completed"}</p>
//       <p>
//         <span>{timeText} </span>| {title}
//       </p>
//     </StyledEvent>
//   );
// }

function CallendarEvent({ children, data }) {
  const { tasksState, setTasksState } = useTaskData();
  const { timeText, event } = data;
  const { id, title, extendedProps } = event;
  const { isCompleted } = extendedProps;

  return (
    <Task
      renderType="compound"
      data={tasksState.find((task) => task.id === Number(id))}
    ></Task>
  );
}

export default CallendarEvent;
