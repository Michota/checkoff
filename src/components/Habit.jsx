import styled from "styled-components";
import HabitGrid from "./HabitGrid";

// Not every year is 364 days long!!!
const habitDaysArr = Array.from({ length: 364 }, (el, i) => {
  return {
    score: Math.floor(Math.random() * 4),
    date: getDateNDaysAgo(i),
  };
});

// ! TODO: Delete me later!
function getDateNDaysAgo(n) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - n);
  return targetDate;
}

// shortcut-property for styling
const defaultColor = "var(--theme-primary)";

const StyledHabit = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min-content;
  height: min-content;
  gap: 1.2rem;
  /* for colored background (after element) */
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0.05;
    background-color: ${(props) => props.$color};
  }

  /* Habit day styling */
  /* Its there instead of HabitDay to avoid prop-drilling */

  & .habit-day {
    background-color: ${(props) => props.$color};
    &.level-1 {
      opacity: 33%;
    }
    &.level-2 {
      opacity: 66%;
    }
    &.level-3 {
      opacity: 100%;
      box-shadow: 0 0 3px ${(props) => props.$color || defaultColor};
    }
  }
`;

// Habit title
const HabitName = styled.input`
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  box-sizing: border-box;
  width: 100%;
`;

// Top-bar of habit component
const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
`;

function Habit({ data }) {
  // const { habitName, id, color, dayData } = data;

  return (
    <StyledHabit $color={"red"}>
      <Header>
        <div>y</div>
        <HabitName value={"habit Name"} maxLength={24} />
        <div>x</div>
      </Header>
      <HabitGrid data={habitDaysArr} />
    </StyledHabit>
  );
}

export default Habit;
