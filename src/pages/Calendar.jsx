import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

import useCreateNewTask from "../features/tasks/useCreateNewTask";

import CallendarEvent from "../components/CallendarEvent";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import TaskDetails from "../components/TaskDetails";
import Draggable from "react-draggable";
import Box from "../ui/Box";
import { MdDragHandle } from "react-icons/md";

const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
`;

const StyledDraggableContainer = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 70rem;
  background-color: var(--theme-black-100);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const StyledGrabHandle = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 3rem;
  cursor: grab;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.05);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    opacity: 0.2;
    color: black;
  }

  &:active,
  &:focus {
    opacity: 0.3;
    color: black;
    background-color: white;
  }
`;

const DraggableContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

function DraggableWithHandle({ children }) {
  return (
    <Draggable
      defaultClassName="draggable"
      // defaultPosition={{ x: 0, y: 0 }}
      handle=".dragHandle"
    >
      <StyledDraggableContainer>
        <StyledGrabHandle className="dragHandle">
          <MdDragHandle />
        </StyledGrabHandle>
        <DraggableContent>{children}</DraggableContent>
      </StyledDraggableContainer>
    </Draggable>
  );
}

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
        // <DraggableField>
        <DraggableWithHandle>
          <TaskDetails />
        </DraggableWithHandle>
        // </DraggableField>
      )}
    </>
  );
}

export default Calendar;
