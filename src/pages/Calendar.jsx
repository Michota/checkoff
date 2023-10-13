import { useEffect, useRef, useState } from "react";
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
  const [view, setView] = useState("dayGridMonth");
  const [api, setApi] = useState(); // calendarRef.current.getApi()

  return (
    <>
      <CalendarContainer>
        <WrappedFullCalendar
          key={view} // ? re-render on change view (it fixes a non-displaying .fc-popover bug)
          view={view}
          setView={setView}
          setApi={setApi}
        />
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
