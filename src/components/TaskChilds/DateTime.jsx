import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";
import { MdAdd, MdCalendarToday, MdDateRange } from "react-icons/md";
import Button from "../../ui/Button";

import { useTaskContext } from "../Task";

// CSS import
import "../../styles/DateTimePickerCalendar.css";
import "../../styles/DateTimeRangePicker.css";
import "../../styles/DateTimePicker.css";
import { useLocaleContext } from "../../contexts/LocaleContext";

const StyledDate = styled.span`
  font-size: 1.2rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
`;

const StyledDateTimeRangePicker = styled(DateTimeRangePicker)`
  min-width: fit-content;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
  min-width: fit-content;
`;

const StyledDTPContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: max-content;
`;

export function DateTime({ customRenderType }) {
  const { locale } = useLocaleContext();

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
          <MdDateRange size={"1.4em"} />
        </Button>
      </>
    );

  // ?  == If there is date and its not tab-task (its tasks details) ? ==

  // * If there is startDate only / if didnt choose to use EndDate
  if (!endDate)
    return (
      <>
        <StyledDTPContainer>
          <StyledDateTimePicker
            autoFocus={false}
            locale={locale}
            calendarIcon={<MdDateRange color="var(--theme-white-100)" />}
            defaultValue={null}
            value={startDate}
            onChange={(value) => {
              const dateValue = value ? new Date(value).toISOString() : null;
              updateState("startDate", dateValue);
            }}
          />

          <Button
            onClick={(e) => updateState("endDate", new Date().toISOString())}
          >
            <MdAdd size={"1.5em"} />
          </Button>
        </StyledDTPContainer>
      </>
    );

  // * If user wants to use endDate
  if (endDate)
    return (
      <>
        <StyledDateTimeRangePicker
          autoFocus={false}
          locale={locale}
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
      </>
    );
}
