import styled from "styled-components";
import { Tooltip } from "./Tooltip";

const StyledHabitDay = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
  background-color: gray;
  opacity: 10%;
`;

function HabitDay({ data, color }) {
  const { score, date } = data;

  const formatedDate = new Date(date).toDateString();

  return (
    <Tooltip
      content={
        score
          ? `Practiced on ${formatedDate}`
          : `Break from habit on ${formatedDate}`
      }
    >
      <StyledHabitDay className={`habit-day level-${score}`} $color={color} />
    </Tooltip>
  );
}

export default HabitDay;
