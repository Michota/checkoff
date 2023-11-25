import styled from "styled-components";
import HabitGrid from "./HabitGrid";
import Button from "./ui/Button";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import DynamicMaterialIcon from "./DynamicMaterialIcon";
import addAlphaToHex from "../utils/addAlphaToHex";

// ! TODO: Delete me later!
// Not every year is 364 days long!!!
const habitDaysArr = Array.from({ length: 364 }, (el, i) => {
  return {
    score: Math.floor(Math.random() * 6),
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
  background-color: ${(props) => `${addAlphaToHex(props.$color, 12)}`};

  /* Habit day styling */
  /* Its there instead of HabitDay to avoid prop-drilling */

  & .habit-day {
    background-color: ${(props) => props.$color};
    &.level-1 {
      opacity: 25%;
    }
    &.level-2 {
      opacity: 45%;
    }
    &.level-3 {
      opacity: 65%;
    }
    &.level-4 {
      opacity: 85%;
    }
    &.level-5 {
      opacity: 100%;
      box-shadow: 0 0 7px ${(props) => props.$color || defaultColor};
    }
  }

  /* Icon styling */
  & .icon-container {
    color: ${(props) => props.$color};
    position: relative;
    padding: 0.6rem;
    border-radius: var(--default-radius);
    background-color: ${(props) => `${addAlphaToHex(props.$color, 20)}`};
  }

  /* Colorpicker background (border) color */
  & .color-picker,
  .icon-picker {
    background-color: ${(props) => `${addAlphaToHex(props.$color, 40)}`};
  }
`;

// Habit title
const HabitName = styled.input`
  &::selection {
    background-color: inherit;
    color: inherit;
  }

  &::placeholder {
    color: inherit;
    opacity: 0.4;
  }
  text-align: left;
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

const HabitIconContainer = styled.div.attrs({ className: "icon-container" })``;

function Habit({ data }) {
  // const { habitName, id, color, dayData } = data;
  const [areSettingsOpened, setAreSettingsOpened] = useState();
  // TODO: remove "lime" from usestate
  const [habitColor, setHabitColor] = useState("#00ff00");
  const [habitIcon, setHabitIcon] = useState();

  if (areSettingsOpened)
    return (
      <StyledHabit $color={habitColor}>
        <HabitSettingsContainer>
          <IconPicker
            getIconName={setHabitIcon}
            onClick={() => setAreSettingsOpened(false)}
          />
          <ColorPicker
            onClick={(color) => {
              setHabitColor(color);
              // Blur - hide settings
              setAreSettingsOpened(false);
            }}
          />
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
        <HabitIconContainer>
          <DynamicMaterialIcon icon={habitIcon} />
        </HabitIconContainer>
        <HabitName
          placeholder="habit with no name..."
          value={""}
          maxLength={24}
          readOnly={true}
        />
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
