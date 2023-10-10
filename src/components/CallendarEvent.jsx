import styled, { css } from "styled-components";
import Box from "../ui/Box";
import Task from "./Task";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";

const StyledEvent = styled(Box)`
  background-color: var(--theme-black-250);
  color: var(--theme-white-100);
  width: 100%;
  /* height: min-content; */
  height: 100%;
  font-size: 1.2rem;
  padding: 0.4em;
  /* // ? Temporary fix for calendar nested event */
  z-index: 5;
  display: flex;
  gap: 2rem;
  cursor: pointer;
  overflow: hidden;

  ${(props) =>
    props.$isCompleted === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          /* color: var(--theme-white-100);
          background-color: var(--theme-black-250); */
        `};

  ${(props) =>
    props.$inTrash === true &&
    css`
      border-bottom: var(--theme-red) 2px solid;
      color: var(--theme-red);
      opacity: 0.5;

      .light-theme & {
        color: #7a1a1a;
        border-bottom: #7a1a1a 2px solid;
      }
    `}
`;

const Title = styled.span`
  font-size: 1.6rem;
`;

function CallendarEvent({ children, renderObject, data }) {
  const { event } = renderObject;
  const { title, extendedProps } = event;
  const { setState } = extendedProps;
  const { startDate, id, inTrash } = data;
  const hoursAndMinutes = new Date(startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { setSelectedTaskId } = useGeneralTasksProvider();

  return (
    <StyledEvent
      $inTrash={inTrash}
      onClick={(e) => {
        setSelectedTaskId(id);
      }}
    >
      <Task setState={setState} renderType="compound" data={data}>
        <Task.Checkbox></Task.Checkbox>
        <span>{hoursAndMinutes}</span>
        <Title>{title}</Title>
      </Task>
    </StyledEvent>
  );
}

export default CallendarEvent;
