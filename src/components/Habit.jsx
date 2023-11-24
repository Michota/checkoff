import styled from "styled-components";
import HabitGrid from "./HabitGrid";
import Button from "./ui/Button";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

// ! TODO: Delete me later!
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
  min-width: 64.2rem;
  min-height: 13.6rem;
  padding: 1rem;
  border-radius: var(--default-radius);

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
    opacity: 0.15;
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

  /* Colorpicker background change */
  & .color-picker {
    background-color: ${(props) => props.$color};
  }
`;

// Habit title
const HabitName = styled.input`
  &::selection {
    background-color: inherit;
    color: inherit;
  }
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

const HabitSettingsContainer = styled.div`
  display: flex;
`;

function Habit({ data }) {
  // const { habitName, id, color, dayData } = data;
  const [areSettingsOpened, setAreSettingsOpened] = useState();
  const [habitColor, setHabitColor] = useState("red");

  if (areSettingsOpened)
    return (
      <StyledHabit $color={habitColor}>
        <HabitSettingsContainer>
          <ColorPicker onClick={setHabitColor} />
          <HabitName
            value={"habit Name"}
            maxLength={24}
            onChange={(e) => {
              // update state
            }}
          />
          <Button>
            <MdEdit
              color={habitColor}
              onClick={() => setAreSettingsOpened(!areSettingsOpened)}
            />
          </Button>
        </HabitSettingsContainer>
      </StyledHabit>
    );

  return (
    <StyledHabit $color={habitColor}>
      <Header>
        <p>x</p>
        <HabitName value={"habit Name"} maxLength={24} readOnly={true} />
        {/* Change color button */}
        <Button>
          <MdEdit
            color={habitColor}
            onClick={() => setAreSettingsOpened(!areSettingsOpened)}
          />
        </Button>
      </Header>
      <HabitGrid data={habitDaysArr} />
    </StyledHabit>
  );
}

export default Habit;
