import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import styled from "styled-components";
import TaskDetails from "../components/TaskDetails";
import DraggableWindow from "../components/DraggableWindow";
import "../styles/FullCalendar.css";
import "../styles/FullCalendarCustom.css";
import WrappedFullCalendar from "../components/WrappedFullCalendar";

// Styling Components
const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
`;

// Main component of Calendar Page
function Calendar() {
  const { selectedTaskId } = useGeneralTasksProvider();

  return (
    <>
      <CalendarContainer>
        <WrappedFullCalendar />
      </CalendarContainer>
      {/* Display task editing (<TaskDetails>) window as draggable element. */}
      {selectedTaskId && (
        <DraggableWindow>
          <TaskDetails />
        </DraggableWindow>
      )}
    </>
  );
}

export default Calendar;
