import styled from "styled-components";
import HabitGrid from "./HabitGrid";

// Not every year is 364 days long!!!
const habitDaysArr = Array.from({ length: 364 }, (el, i) => {
  return {
    level: Math.floor(Math.random() * 4),
    date: getDateNDaysAgo(i),
  };
});

function getDateNDaysAgo(n) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - n);
  return targetDate;
}

const StyledHabit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min-content;
  height: min-content;
  gap: 1.2rem;
`;

const HabitName = styled.input`
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  box-sizing: border-box;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
`;

function Habit({ data }) {
  // const { habitName, dayData } = data;

  return (
    <StyledHabit>
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
