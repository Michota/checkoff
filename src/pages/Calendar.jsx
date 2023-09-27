import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

import useCreateNewTask from "../features/tasks/useCreateNewTask";

import CallendarEvent from "../components/CallendarEvent";
import { useManageTaskData } from "../features/tasks/useManageTaskData";

const CalendarContainer = styled.div`
  height: 100%;
`;

const events = [
  {
    // this object will be "parsed" into an Event Object
    title: "The Title", // a property!
    start: "2023-09-15", // a property!
    end: "2018-09-02", // a property! ** see important note below about 'end' **,
  },
];

function parseTaskToEvents([tasks, setState]) {
  if (!tasks) return;
  const events = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      start: task.startDate,
      end: task.endDate,
      extendedProps: {
        isCompleted: task.isCompleted,
        setState: setState,
      },
    };
  });
  return events;
}

function eventContent(renderObject, data) {
  return <CallendarEvent renderObject={renderObject} data={data} />;
}

function Calendar() {
  const { createTask } = useCreateNewTask();
  // const { isLoading, tasksState, setTasksState } = useTaskData();
  // const { updateTask, isUpdating } = useUpdateTask();
  const { tasks, saveAndUpdateTask } = useManageTaskData();

  function openEventDialog(eventId) {
    // console.log(tasks.find((task) => eventId === task.id));
  }

  return (
    <CalendarContainer>
      <FullCalendar
        buttonIcons={false}
        height={"100%"}
        plugins={[dayGridPlugin]}
        events={parseTaskToEvents([tasks, saveAndUpdateTask] ?? null)}
        eventClick={function (info) {
          info.jsEvent.preventDefault();
          openEventDialog(Number(info.event.id));
        }}
        eventContent={(arg) => {
          const task = tasks.find((t) => Number(arg.event.id) === t.id);
          return eventContent(arg, task);
        }}
      />
    </CalendarContainer>
  );
}

export default Calendar;
