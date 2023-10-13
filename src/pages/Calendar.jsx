import { useEffect, useRef, useState } from "react";

import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";

import styled from "styled-components";

import TaskDetails from "../components/TaskDetails";
import DraggableWindow from "../components/DraggableWindow";

import "../styles/FullCalendar.css";
import "../styles/FullCalendarCustom.css";
import WrappedFullCalendar from "../components/WrappedFullCalendar";
// Styling Components

const CalendarContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
`;

// Variables used by main calendar component

// HTML elements appearing in Header of Calendar

// Parse Task Data to Event compatible data

// Main component of Calendar
function Calendar() {
  const { selectedTaskId } = useGeneralTasksProvider();
  const [view, setView] = useState("dayGridMonth");
  const [api, setApi] = useState();

  const customButtons = {
    todayBtn: {
      text: "Today",
      // icon: "customButton todayBtn",
      click: () => api.today(),
    },
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
      // setView("multiMonthYear"),
    },
    prevBtn: {
      icon: "customButton prevBtn",
      click: () => api.prev(),
    },
    nextBtn: {
      icon: "customButton nextBtn",
      click: () => api.next(),
    },
  };

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

  return (
    <>
      <CalendarContainer>
        <WrappedFullCalendar
          key={view}
          view={view}
          setView={setView}
          setApi={setApi}
          customButtons={customButtons}
          views={views}
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
