import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import useTaskData from "../features/tasks/useTaskData";
import useUpdateTask from "../features/tasks/useTaskUpdate";
import useCreateNewTask from "../features/tasks/useCreateNewTask";
import Dialog from "../components/Dialog";
import CallendarEvent from "../components/CallendarEvent";

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

function parseTaskToEvents(tasks) {
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

function eventContent(renderObject) {
  console.log(renderObject);
  return <CallendarEvent data={renderObject}>s</CallendarEvent>;
}

function Calendar() {
  const { isLoading, tasksState, setTasksState } = useTaskData();
  const { updateTask, isUpdating } = useUpdateTask();
  const { createTask } = useCreateNewTask();

  function openEventDialog(eventId) {
    console.log(tasksState.find((task) => eventId === task.id));
  }

  return (
    <CalendarContainer>
      <FullCalendar
        buttonIcons={false}
        height={"100%"}
        plugins={[dayGridPlugin]}
        events={parseTaskToEvents(tasksState ?? null)}
        eventClick={function (info) {
          openEventDialog(Number(info.event.id));
        }}
        eventContent={eventContent}
      />
    </CalendarContainer>
  );
}

export default Calendar;
