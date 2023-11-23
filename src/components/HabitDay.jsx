import styled from "styled-components";
import { Tooltip } from "./Tooltip";

const StyledHabitDay = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
  background-color: ${(props) => props.$color || "green"};
  opacity: 10%;

  &.level-1 {
    opacity: 33%;
  }
  &.level-2 {
    opacity: 66%;
  }
  &.level-3 {
    opacity: 100%;
  }
`;

function HabitDay({ data, color }) {
  const { level, date } = data;

  const formatedDate = new Date(date).toDateString();

  return (
    <Tooltip
      content={
        level
          ? `Practiced on ${formatedDate}`
          : `Break from habit on ${formatedDate}`
      }
    >
      <StyledHabitDay className={`level-${level}`} />
    </Tooltip>
  );
}

export default HabitDay;
