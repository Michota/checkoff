import { MdAdd } from "react-icons/md";
import { Tooltip } from "./Tooltip";
import Button from "./ui/Button";
import styled from "styled-components";
import { useGeneralTasksContext } from "../contexts/GeneralTasksContext";

export const StyledButtonCreateTask = styled(Button)`
  border: none;
  background-color: var(--theme-primary);
  color: var(--theme-black-200);
  position: fixed;
  border-radius: 10rem;
  bottom: 0;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  opacity: 50%;

  transform: translate(10rem, -100%);

  /* Overwrite Button deafult translate parameters */
  &:hover {
    transform: translate(10rem, -100%);
    opacity: 100%;
  }

  &:active {
    transform: translate(10rem, -100%);
  }

  .light-theme & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;

export function ButtonCreateTask() {
  const { localDispatcher: dispatch } = useGeneralTasksContext();
  return (
    <StyledButtonCreateTask
      onClick={() => dispatch({ type: "tasks/createTask" })}
    >
      {/* Use Tooltip instead of tip-prop to fix positioning bug */}
      <Tooltip content={"Create new task"}>
        <MdAdd />
      </Tooltip>
    </StyledButtonCreateTask>
  );
}
