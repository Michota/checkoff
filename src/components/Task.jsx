import { createContext, useContext, useEffect, useState } from "react";
import { styled, css } from "styled-components";
import {
  MdCalendarToday,
  MdDateRange,
  MdDeleteForever,
  MdDone,
} from "react-icons/md";
import useTaskDelete from "../services/useTaskDelete";
import stringShortener from "../utils/stringShortener";

import Box from "../ui/Box";
import Button from "../ui/Button";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "../styles/DateTimePicker.css";
import "../styles/Callendar.css";
import DateTimePicker from "react-datetime-picker";
import DeleteButton from "./TaskChilds/DeleteButton";

// Styling components with StyledComponents

const StyledTask = styled(Box)`
  overflow-y: hidden;
  cursor: pointer;
  min-width: 30rem;
  width: max-content;
  min-height: 7rem;
  height: fit-content;
  transition: transform 100ms;
  justify-content: space-between;

  &:active {
    transform: scale(98%);
  }

  ${(props) =>
    props.$isCompleted === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          color: var(--theme-white-100);
          background-color: var(--theme-black-250);
        `};
`;

const TaskFlexContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0.2rem;
`;

const StyledDescription = styled.span`
  width: max-content;
  font-size: 1.2rem;
`;

const StyledDetails = styled.span`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const StyledTitle = styled.input`
  margin-left: auto;
  width: 100%;
  font-size: 1.6rem;
`;

const StyledCheckboxHitbox = styled.label`
  aspect-ratio: 1/1;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  line-height: 0;
  font-size: 1.6rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  border-radius: 0.4rem;

  ${(props) => {
    const priority = props.$priority ?? 0;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      outline: 0.1rem solid var(--priority-${priority});
    `;
  }}
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledDateTimeRangePicker = styled(DateTimeRangePicker)``;

const StyledDate = styled.span`
  font-size: 1.2rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
`;

// End of Styling with StyledComponents

const TaskContext = createContext();

function useTaskContext() {
  const value = useContext(TaskContext);
  if (value === undefined)
    throw new Error("Value in task context was undefined.");
  return value;
}

// function TaskProvider({ children }) {
//   return <TaskContext.Provider value={}>{children}</TaskContext.Provider>;
// }

// * Main Component
function Task({
  children,
  data,
  setSelectedTaskId,
  setState,
  renderType = "tab",
}) {
  const { deleteTask } = useTaskDelete();
  const valueProvider = { ...data, updateState, renderType, deleteTask };

  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  return (
    <TaskContext.Provider value={valueProvider}>
      {/* Render normal task as tab */}
      {renderType === "tab" && (
        <StyledTask
          $isCompleted={data.isCompleted}
          onClick={(e) => {
            // ? StopPropagation on all the child components
            // if (e.currentTarget !== e.target) return;
            setSelectedTaskId(data.id);
          }}
        >
          <TaskFlexContainer>
            <Checkbox />
            <StyledDetails>
              <Title />
              {/* span-element created for styling reasons only */}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <Description />
                <DateTime />
              </span>
            </StyledDetails>
          </TaskFlexContainer>
          <DeleteButton />
        </StyledTask>
      )}
      {/* Render task as compound component */}
      {renderType === "compound" && <>{children}</>}
    </TaskContext.Provider>
  );
}

function Checkbox({ className }) {
  const { priority, isCompleted, updateState } = useContext(TaskContext);

  return (
    <StyledCheckboxHitbox
      className={className}
      $priority={priority}
      $isCompleted={isCompleted}
      onClick={(e) => e.stopPropagation()}
    >
      {isCompleted && <MdDone />}
      <HiddenCheckbox
        aria-checked={isCompleted}
        onClick={(e) => {
          e.stopPropagation();
          updateState("isCompleted", !isCompleted);
        }}
      />
    </StyledCheckboxHitbox>
  );
}

function Title({ className }) {
  const { title, updateState } = useContext(TaskContext);

  const isEmpty = title === "" || !title;

  return (
    <StyledTitle
      onChange={(e) => {
        e.stopPropagation();
        updateState("title", e.target.value);
      }}
      value={title}
      className={className}
      $isEmpty={isEmpty}
      placeholder="This task has no name..."
    />
  );
}

function Description({ className }) {
  const { description, updateState, renderType } = useContext(TaskContext);
  return (
    <>
      {description && renderType === "tab" && (
        <StyledDescription>{stringShortener(description)}</StyledDescription>
      )}
      {renderType === "compound" && (
        <textarea
          placeholder="Enter description here..."
          className={className}
          value={description}
          onChange={(e) => updateState("description", e.target.value)}
        />
      )}
    </>
  );
}

function DateTime() {
  const { startDate, endDate, updateState, renderType } =
    useContext(TaskContext);

  const dateDisabled =
    new Date(startDate).toISOString() === new Date(null).toISOString();

  if (renderType === "tab" && dateDisabled) return null;
  if (renderType === "tab") {
    return (
      <StyledDate>
        {<MdCalendarToday size={"1em"} />}
        {new Date(startDate).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </StyledDate>
    );
  }
  // * If there is no date (timestamp 0)
  if (renderType !== "tab" && dateDisabled)
    return (
      <>
        <Button
          backgroundColor="transparent"
          onClick={(e) => {
            const dateValue = new Date().toISOString();
            updateState("startDate", dateValue);
          }}
        >
          <MdDateRange size={"2em"} />
        </Button>
      </>
    );

  // * If there is date and its not tab-task (its tasks details)
  return (
    <DateTimePicker
      calendarIcon={<MdDateRange color="var(--theme-white-100)" />}
      defaultValue={null}
      value={startDate}
      onChange={(value) => {
        const dateValue = value ? new Date(value).toISOString() : null;
        updateState("startDate", dateValue);
      }}
    />
  );
}

// Compound Component Children as properties
Task.Checkbox = Checkbox;
Task.Title = Title;
Task.Description = Description;
Task.DeleteButton = DeleteButton;
Task.DateTime = DateTime;

export default Task;
export { useTaskContext };
