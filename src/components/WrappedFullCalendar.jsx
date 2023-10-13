import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import allLocales from "@fullcalendar/core/locales-all";
import CallendarEvent from "../components/CallendarEvent";
import { useSettingsContext } from "../contexts/SettingsContext";
import useCreateNewTask from "../features/tasks/useCreateNewTask";
import getUNIX from "../utils/getUNIX";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import { useEffect, useRef } from "react";

const headerToolbar = {
  start: "todayBtn dayBtn,weekBtn,monthBtn,yearBtn",
  // start: "timeGridDay,timeGridWeek,dayGridMonth", // will normally be on the left. if RTL, will be on the right
  center: "title",
  end: "prevBtn,nextBtn", // will normally be on the right. if RTL, will be on the left
};

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

// !!!!!

function WrappedFullCalendar({ views, customButtons, setApi, view, setView }) {
  const { tasks, saveAndUpdateTask, selectedTaskId, setSelectedTaskId } =
    useGeneralTasksProvider();

  const calendarRef = useRef();

  useEffect(function () {
    console.log("render");
  }, []);

  const { current: calendarDom } = calendarRef;

  useEffect(
    function () {
      if (setApi) setApi(calendarDom ? calendarDom.getApi() : null);
    },
    [calendarDom, setApi]
  );

  useEffect(
    function () {
      calendarDom?.getApi().changeView(view);
    },
    [view, calendarDom]
  );

  const { locale } = useSettingsContext();
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

  console.log(calendarDom);
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
        initialView={view}
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
