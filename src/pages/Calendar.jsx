import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import enLocale from "@fullcalendar/core/locales/en-au";
import styled from "styled-components";

import useCreateNewTask from "../features/tasks/useCreateNewTask";

import CallendarEvent from "../components/CallendarEvent";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import TaskDetails from "../components/TaskDetails";
import Draggable from "react-draggable";
import Box from "../ui/Box";
import { MdDragHandle } from "react-icons/md";
import DraggableWindow from "../components/DraggableWindow";

const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
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
          locales={[enLocale]}
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
        // <DraggableField>
        <DraggableWindow>
          <TaskDetails />
        </DraggableWindow>
        // </DraggableField>
      )}
    </>
  );
}

export default Calendar;
