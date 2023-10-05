import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";

import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import useCreateNewTask from "../features/tasks/useCreateNewTask";
import { useLocaleContext } from "../contexts/LocaleContext";

import styled from "styled-components";

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

  /* .material-symbols-outlined,
  .fc-icon-material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  } */
  .fc-icon-customButton {
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      font-family: "Material Symbols Outlined";
      -webkit-font-feature-settings: "liga";
      -webkit-font-smoothing: antialiased;
    }
  }

  .fc-button-group > button {
  }

  .todayBtn {
    /* &::after {
      content: "today";
    } */
  }
  .dayBtn {
    &::after {
      content: "calendar_today";
    }
  }
  .weekBtn {
    &::after {
      content: "date_range";
    }
  }
  .monthBtn {
    &::after {
      content: "calendar_month";
    }
  }
  .yearBtn {
    &::after {
      content: "event";
    }
  }
  .prevBtn {
    &::after {
      content: "chevron_left";
    }
  }
  .nextBtn {
    &::after {
      content: "chevron_right";
    }
  }
  .prevYearBtn {
    &::after {
      content: "keyboard_double_arrow_left";
    }
  }
  .nextYearBtn {
    &::after {
      content: "keyboard_double_arrow_right";
    }
  }
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
  const { tasks, saveAndUpdateTask, selectedTaskId, setSelectedTaskId } =
    useGeneralTasksProvider();
  const { locale } = useLocaleContext();
  const { createTask } = useCreateNewTask();

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
          locale={locale}
          locales={allLocales}
          views={views}
          headerToolbar={headerToolbar}
          editable={true}
          buttonIcons={false}
          initialView={calendarView}
          height={"100%"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={(e) => {
            setSelectedTaskId(createTask({ startDate: e.dateStr }));
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
