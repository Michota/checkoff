import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

import useCreateNewTask from "../features/tasks/useCreateNewTask";

import CallendarEvent from "../components/CallendarEvent";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import TaskDetails from "../components/TaskDetails";

const CalendarContainer = styled.div`
  height: 100%;
  z-index: 0;
`;

const FloatingBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  overflow: auto;
  background-color: var(--theme-black-200);
  z-index: 1;
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
  const { tasks, saveAndUpdateTask, setSelectedTaskId, selectedTaskId } =
    useGeneralTasksProvider();

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          buttonIcons={false}
          height={"100%"}
          plugins={[dayGridPlugin]}
          events={parseTaskToEvents([tasks, saveAndUpdateTask] ?? null)}
          eventClick={function (info) {
            info.jsEvent.preventDefault();
            // openEventDialog(Number(info.event.id));
          }}
          eventContent={(arg) => {
            const task = tasks.find((t) => Number(arg.event.id) === t.id);
            return eventContent(arg, task);
          }}
        />
      </CalendarContainer>

      {selectedTaskId && (
        <FloatingBox>
          <TaskDetails />
        </FloatingBox>
      )}
    </>
  );
}

export default Calendar;
