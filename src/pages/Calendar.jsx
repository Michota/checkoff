import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

const CalendarContainer = styled.div`
  height: 100%;
`;

function Calendar() {
  return (
    <CalendarContainer>
      <FullCalendar height={"100%"} plugins={[dayGridPlugin]} />
    </CalendarContainer>
  );
}

export default Calendar;
