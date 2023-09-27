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
  /* // ? Temporary fix for calendar nested event */
  z-index: 5;
  display: flex;
  gap: 2rem;

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

function CallendarEvent({ children, renderObject, data }) {
  const { timeText, event } = renderObject;
  const { id: stringId, title, extendedProps } = event;
  const { isCompleted, setState } = extendedProps;
  const { startDate } = data;
  const hoursAndMinutes = new Date(startDate).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <StyledEvent>
      <Task setState={setState} renderType="compound" data={data}>
        <Task.Checkbox></Task.Checkbox>
        <span>{hoursAndMinutes}</span>
        <Task.Title></Task.Title>
      </Task>
    </StyledEvent>
  );
}

export default CallendarEvent;
