import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import useTaskData from "../services/useTaskData";
import useUpdateTask from "../services/useTaskUpdate";
import useCreateNewTask from "../services/useCreateNewTask";

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

function taskToEvents(tasks) {
  if (!tasks) return;
  const events = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      start: task.startDate,
      end: task.endDate,
    };
  });
  console.log(events);
  return events;
}

function Calendar() {
  const { isLoading, tasksState, setTasksState } = useTaskData();
  const { updateTask, isUpdating } = useUpdateTask();
  const { createTask } = useCreateNewTask();

  console.log(tasksState);

  return (
    <CalendarContainer>
      <FullCalendar
        buttonIcons={false}
        height={"100%"}
        plugins={[dayGridPlugin]}
        events={taskToEvents(tasksState ?? null)}
      />
    </CalendarContainer>
  );
}

export default Calendar;
