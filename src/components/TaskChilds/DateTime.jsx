import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import styled from "styled-components";
import { MdCalendarToday, MdDateRange } from "react-icons/md";

import Button from "../../ui/Button";
import { useTaskContext } from "../Task";

// CSS import
import "../../styles/DateTimePickerCalendar.css";
import "../../styles/DateTimeRangePicker.css";

const StyledDate = styled.span`
  font-size: 1.2rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
`;

export function DateTime({ customRenderType }) {
  const {
    startDate,
    endDate,
    updateState,
    renderType: taskRenderType,
  } = useTaskContext();

  const dateDisabled =
    new Date(startDate).toISOString() === new Date(null).toISOString();

  const renderType = customRenderType ? customRenderType : taskRenderType;

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
    <DateTimeRangePicker
      autoFocus={false}
      locale="en"
      calendarIcon={<MdDateRange color="var(--theme-white-100)" />}
      defaultValue={null}
      value={[startDate, endDate]}
      onChange={(value) => {
        if (value !== null) {
          const start = value[0] ? new Date(value[0]).toISOString() : null;
          const end = value[1] ? new Date(value[1]).toISOString() : null;
          updateState("bothDate", [start, end]);
        } else {
          updateState("bothDate", [null, null]);
        }
      }}
    />
  );
}
