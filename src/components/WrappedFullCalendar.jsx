import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import allLocales from "@fullcalendar/core/locales-all";
import CallendarEvent from "../components/CallendarEvent";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import useCreateNewTask from "../features/tasks/useCreateNewTask";
import getUNIX from "../utils/getUNIX";

// Views option
const views = {
  week: {
    titleFormat: { meridiem: false },
  },
  timeGrid: {
    titleFormat: { meridiem: false },
  },
  day: {
    titleFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: false,
    },
  },
  year: {
    titleFormat: { year: "numeric" },
  },
};

// HTML elements appearing in Header of Calendar
const headerToolbar = {
  start: "todayBtn dayBtn,weekBtn,monthBtn,yearBtn",
  center: "title",
  end: "prevBtn,nextBtn",
};

// Parse Task data to Event compatible data
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

// Event renderer
function eventContent(renderObject, data) {
  return <CallendarEvent renderObject={renderObject} data={data} />;
}

function WrappedFullCalendar({ setApi, view, setView }) {
  const { locale } = useSettingsContext();
  const { createTask } = useCreateNewTask();
  const { tasks, saveAndUpdateTask, setSelectedTaskId } =
    useGeneralTasksProvider();

  const calendarRef = useRef();
  const { current: calendarDom } = calendarRef;
  const api = calendarDom?.getApi();

  // Expose Calendar API to parent
  useEffect(
    function () {
      if (setApi) setApi(calendarDom ? calendarDom.getApi() : null);
    },
    [calendarDom, setApi]
  );

  // Buttons at header (top-side) part of page
  const customButtons = {
    // Today button
    todayBtn: {
      text: "Today",
      click: () => api.today(),
    },
    // Arrow (< & >) buttons
    prevBtn: {
      icon: "customButton prevBtn",
      click: () => api.prev(),
    },
    nextBtn: {
      icon: "customButton nextBtn",
      click: () => api.next(),
    },
    // Views buttons
    dayBtn: {
      hint: "Day view.",
      icon: "customButton dayBtn",
      click: () => setView("timeGridDay"),
    },
    weekBtn: {
      icon: "customButton weekBtn",
      hint: "Week view.",
      click: () => setView("timeGridWeek"),
    },
    monthBtn: {
      hint: "Month view.",
      icon: "customButton monthBtn",
      click: () => setView("dayGridMonth"),
    },
    yearBtn: {
      hint: "Year view.",
      icon: "customButton yearBtn",
      click: () => setView("multiMonthYear"),
    },
  };

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

  if (view)
    return (
      <FullCalendar
        ref={calendarRef}
        timeZone="local"
        locale={locale}
        locales={allLocales}
        views={views}
        editable={true}
        headerToolbar={headerToolbar}
        buttonIcons={false}
        dayMaxEventRows={2}
        initialView={view} // actually its like "changeView", becasue this component has to be re-rendered with key prop.
        multiMonthMaxColumns={2}
        customButtons={customButtons}
        height={"100%"}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          multiMonthPlugin,
          interactionPlugin,
        ]}
        dateClick={(e) => {
          if (e.jsEvent.detail !== 2) return;
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
    );
}

export default WrappedFullCalendar;
