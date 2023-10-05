import { useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
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
import "../styles/FullCalendarButtons.css";

// Styling Components

const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
`;

// Variables used by main calendar component

function customButtons(fullCalendar) {
  const api = fullCalendar?.getApi();
  // console.log(api);

  if (api)
    return {
      todayBtn: {
        text: "Today",
        // icon: "customButton todayBtn",
        click: () => api.today(),
      },
      dayBtn: {
        icon: "customButton dayBtn",
        click: () => api.changeView("timeGridDay"),
      },
      weekBtn: {
        icon: "customButton weekBtn",

        click: () => api.changeView("timeGridWeek"),
      },
      monthBtn: {
        icon: "customButton monthBtn",

        click: () => api.changeView("dayGridMonth"),
      },
      yearBtn: {
        icon: "customButton yearBtn",

        click: () => api.changeView("multiMonthYear"),
      },
      prevBtn: {
        icon: "customButton prevBtn",

        click: () => api.prev(),
      },
      nextBtn: {
        icon: "customButton nextBtn",

        click: () => api.next(),
      },
      // prevYearBtn: {
      //   icon: "customButton prevYearBtn",

      //   click: () => api.next(),
      // },
      // nextYearBtn: {
      //   icon: "customButton nextYearBtn",

      //   click: () => api.next(),
      // },
    };
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
  year: {
    titleFormat: { year: "numeric" },
  },
};

// HTML elements appearing in Header of Calendar
const headerToolbar = {
  start: "todayBtn dayBtn,weekBtn,monthBtn,yearBtn",
  // start: "timeGridDay,timeGridWeek,dayGridMonth", // will normally be on the left. if RTL, will be on the right
  center: "title",
  end: "prevBtn,nextBtn", // will normally be on the right. if RTL, will be on the left
};

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

// Main component of Calendar
function Calendar() {
  const { tasks, saveAndUpdateTask, selectedTaskId, setSelectedTaskId } =
    useGeneralTasksProvider();
  const { locale } = useLocaleContext();
  const { createTask } = useCreateNewTask();

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

  const calendarRef = useRef();

  return (
    <>
      <CalendarContainer>
        {/* Buttons stylesheet */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <FullCalendar
          ref={calendarRef}
          timeZone="local"
          locale={locale}
          locales={allLocales}
          views={views}
          editable={true}
          headerToolbar={headerToolbar}
          buttonIcons={false}
          customButtons={customButtons(calendarRef.current)}
          height={"100%"}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
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
