import styled from "styled-components";
import HabitDay from "./HabitDay";

const StyledHabitGrid = styled.div`
  /* Its default background-color. The actuall color is set in Habit component */
  background-color: var(--theme-black-100);
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1rem);
  gap: 2px;
  width: fit-content;
`;

function HabitGrid({ data }) {
  return (
    <StyledHabitGrid>
      {data.map((level, i) => (
        <HabitDay key={i} data={data[i]} color={"pink"} />
      ))}
    </StyledHabitGrid>
  );
}

export default HabitGrid;
