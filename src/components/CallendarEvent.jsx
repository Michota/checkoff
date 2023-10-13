import styled, { css } from "styled-components";
import Box from "./Box";
import Task from "./Task";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";

const StyledEvent = styled(Box)`
  background-color: var(--theme-black-250);
  color: var(--theme-white-100);
  width: 100%;
  /* height: min-content; */
  height: 100%;
  font-size: 1.2rem;
  padding: 0.6em;
  /* // ? Temporary fix for calendar nested event */
  z-index: 5;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;

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

  &:empty::after {
    content: "No title...";
    opacity: 0.2;
  }
`;

const HoursAndMinutes = styled.div`
  background-color: var(--theme-black-200);
  padding: 0.2rem 0.4rem;
  border-radius: 20rem;
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
        <span>
          <HoursAndMinutes>{hoursAndMinutes}</HoursAndMinutes>
          <Task.Checkbox></Task.Checkbox>
        </span>
        <Title>{title}</Title>
      </Task>
    </StyledEvent>
  );
}

export default CallendarEvent;
