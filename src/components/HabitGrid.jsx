import styled from "styled-components";
import HabitDay from "./HabitDay";
import { getDateNDaysAgo } from "../utils/getDateNDaysAgo";

const StyledHabitGrid = styled.div`
  /* Its default background-color. The actuall color is set in Habit component */
  background-color: var(--theme-black-100);
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1rem);
  gap: 2px;
  width: fit-content;
  transform: rotate(180deg); // Make grid start at bottom right corner
`;

function stretchToYearData(arr, targetSize) {
  const currentSize = arr.length;

  if (currentSize >= targetSize) {
    return arr; // Array is already of the desired size
  }
  const remainingSize = targetSize - currentSize;
  const defaultObject = {
    score: 0,
  }; // Change this to the default object you want to add

  for (let i = 0; i < remainingSize; i++) {
    arr.push(defaultObject);
  }

  return arr;
}

function HabitGrid({ data }) {
  const gridSize = 364; // Make grid perfectly fit in rectangle.
  const lastYear = stretchToYearData(data, gridSize);
  return (
    <StyledHabitGrid>
      {lastYear.map((level, i) => (
        <HabitDay
          key={i}
          data={
            data[i].score ? data[i] : { ...data[i], date: getDateNDaysAgo(i) }
          }
        />
      ))}
    </StyledHabitGrid>
  );
}

export default HabitGrid;
