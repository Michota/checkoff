import styled from "styled-components";
import HabitGrid from "./HabitGrid";
import Button from "./ui/Button";
import { MdCheckBoxOutlineBlank, MdDone, MdEdit } from "react-icons/md";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import DynamicMaterialIcon from "./DynamicMaterialIcon";
import addAlphaToColor from "../utils/addAlphaToColor";
import { Tooltip } from "./Tooltip";
import useHabitActions from "../features/habits/useHabitActions";
import useHabitUpdate from "../features/habits/useHabitUpdate";
import LoadingSpinner from "./ui/LoadingSpinner";

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
  background-color: ${(props) =>
    `${addAlphaToColor(props.$color || defaultColor, 20)}`};

  /* Habit day styling */
  /* Its there instead of HabitDay to avoid prop-drilling */

  & .habit-day {
    background-color: ${(props) => props.$color || defaultColor};
    &.level-0 {
      opacity: 25%;
    }
    &.level-1 {
      opacity: 60%;
    }
    &.level-2 {
      opacity: 75%;
    }
    &.level-3 {
      opacity: 80%;
    }
    &.level-4 {
      opacity: 90%;
    }
    &.level-5 {
      opacity: 100%;
      box-shadow: 0 0 8px ${(props) => props.$color || defaultColor};
    }
  }

  /* Icon styling */
  & .icon-container {
    color: ${(props) => props.$color || defaultColor};
    position: relative;
    padding: 0.6rem;
    border-radius: var(--default-radius);
    background-color: ${(props) =>
      `${addAlphaToColor(props.$color || defaultColor, 20)}`};
  }

  /* Colorpicker background (border) color */
  & .color-picker,
  .icon-picker {
    background-color: ${(props) =>
      `${addAlphaToColor(props.$color || defaultColor, 40)}`};
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

// Habit Description
const HabitDescription = styled.input`
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
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
`;

// Top-bar of habit component
const Header = styled.header`
  display: flex;
  width: 100%;
  /* justify-content: space-between; */
  align-items: center;
  gap: 2rem;

  & .habit-edit,
  .habit-save-settings {
    margin-left: auto;
  }
`;

const HabitSettingsContainer = styled.div.attrs({
  className: "habit-settings-container",
})`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlaceHolderInSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: black;
  opacity: 40%;
  border-radius: var(--default-radius);
  cursor: not-allowed;
`;

const HabitIconContainer = styled.div.attrs({ className: "icon-container" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  aspect-ratio: 1/1;

  & > * {
    width: 75%;
    height: 75%;
  }
`;

// TODO: Make edit-button appear upon hovering on icon/description/name

function Habit({ data, dispatch }) {
  const { name, description, day_data: days, color, icon, id } = data;
  const { editHabitColor, editHabitIcon, editHabitName, editHabitDescription } =
    useHabitActions(id, dispatch);
  const { update, isLoading } = useHabitUpdate();

  const [areSettingsOpened, setAreSettingsOpened] = useState();

  if (isLoading)
    return (
      <StyledHabit $color={color}>
        <LoadingSpinner />
      </StyledHabit>
    );

  if (areSettingsOpened)
    return (
      <StyledHabit $color={color}>
        <Header>
          <HabitIconContainer>
            <DynamicMaterialIcon icon={icon} />
          </HabitIconContainer>
          <div>
            <HabitName
              placeholder="Habit with no name..."
              value={name}
              maxLength={24}
              onChange={(e) => editHabitName(e.target.value)}
            />
            <HabitDescription
              placeholder="Description..."
              value={description}
              maxLength={48}
              onChange={(e) => editHabitDescription(e.target.value)}
            />
          </div>
          <Button className="habit-save-settings">
            <Tooltip content={"Save habit settings"}>
              {/* send data on save */}
              <MdDone
                color={color}
                onClick={() => {
                  update(data);
                  setAreSettingsOpened(!areSettingsOpened);
                }}
              />
            </Tooltip>
          </Button>
        </Header>
        <HabitSettingsContainer>
          <IconPicker getIconName={(newIcon) => editHabitIcon(newIcon)} />
          <ColorPicker
            onClick={(newColor) => {
              editHabitColor(newColor);
            }}
          />
          <PlaceHolderInSettings>
            More personalization options soon...
          </PlaceHolderInSettings>
        </HabitSettingsContainer>
      </StyledHabit>
    );

  return (
    <StyledHabit $color={color}>
      <Header>
        <HabitIconContainer>
          <DynamicMaterialIcon icon={icon} />
        </HabitIconContainer>
        <div>
          <HabitName
            placeholder="Habit with no name..."
            value={name}
            maxLength={24}
            readOnly={true}
          />
          <HabitDescription
            placeholder="Description..."
            value={description}
            maxLength={48}
            readOnly={true}
          />
        </div>

        <Button className="habit-edit">
          <Tooltip content={"Edit habit"}>
            <MdEdit
              color={color}
              onClick={() => setAreSettingsOpened(!areSettingsOpened)}
            />
          </Tooltip>
        </Button>
        <Button className="habit-check">
          <Tooltip content={"Mark as practiced today"}>
            <MdCheckBoxOutlineBlank // Change To ChcebkoxOutline if done for today.
              color={color}
            />
          </Tooltip>
        </Button>
      </Header>
      <HabitGrid data={days} />
    </StyledHabit>
  );
}

export default Habit;
