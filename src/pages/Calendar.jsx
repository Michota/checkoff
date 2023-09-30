import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import getUNIX from "../utils/getUNIX";

import CallendarEvent from "../components/CallendarEvent";
import TaskDetails from "../components/TaskDetails";
import DraggableWindow from "../components/DraggableWindow";

import "../styles/FullCalendar.css";
import "../styles/FullCalendarCustom.css";

// Styling Components

const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
`;

// Parse Task Data to Event compatible data

function parseTaskToEvents([tasks]) {
  if (!tasks) return;
  const events = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      start: task.startDate,
      end: task.endDate,
      extendedProps: {
        isCompleted: task.isCompleted,
      },
    };
  });
  return events;
}

// Render Event
function eventContent(renderObject, data) {
  return <CallendarEvent renderObject={renderObject} data={data} />;
}

const views = {
  week: {
    titleFormat: { meridiem: false },
  },
  timeGrid: {
    titleFormat: { meridiem: false },
  },
  day: {
    titleFormat: { hour: "numeric", minute: "2-digit", meridiem: false },
  },
};

// HTML elements appearing in Header of Calendar
const headerToolbar = {
  start: "timeGridDay,timeGridWeek,dayGridMonth", // will normally be on the left. if RTL, will be on the right
  center: "prevYear,title,nextYear",
  end: "prev,next", // will normally be on the right. if RTL, will be on the left
};

// Main component of Calendar
function Calendar() {
  const [calendarView, setCalendarView] = useState("timeGridWeek");
  const { tasks, saveAndUpdateTask, selectedTaskId } =
    useGeneralTasksProvider();

  // Handle Change View
  function handleChangeView(calendarObj) {
    const newView =
      calendarView === "dayGridMonth" ? "timeGridWeek" : "dayGridMonth";
    setCalendarView(newView);
    calendarObj.changeView(newView);
  }

  function handleEventUpdate(e) {
    // Data from event. OldEvent is data from before the changes
    const { start, end, id: eventId } = e.event;
    const { start: oldStart, end: oldEnd } = e.oldEvent;

    // Get task data for subsequent data operations
    const data = tasks.find((task) => task.id === Number(eventId));

    // Check if date actually changed.
    if (
      getUNIX(start) !== getUNIX(oldStart) ||
      getUNIX(end) !== getUNIX(oldEnd)
    ) {
      // Save new data by overwriting old data
      saveAndUpdateTask({
        ...data,
        startDate: start,
        endDate: end,
      });
    }
  }

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          timeZone="local"
          locale="local"
          views={views}
          headerToolbar={headerToolbar}
          editable={true}
          buttonIcons={false}
          initialView={calendarView}
          height={"100%"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={(e) => {
            console.log(e);
          }}
          events={parseTaskToEvents([tasks] ?? null)}
          eventClick={function (info) {
            info.jsEvent.preventDefault();
          }}
          eventContent={(arg) => {
            const task = tasks.find((t) => Number(arg.event.id) === t.id);
            return eventContent(arg, task);
          }}
          eventChange={(e) => handleEventUpdate(e)}
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
