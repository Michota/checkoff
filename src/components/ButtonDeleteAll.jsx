import styled from "styled-components";
import { StyledButtonCreateTask } from "./ButtonCreateTask";
import { Tooltip } from "./Tooltip";
import { MdDeleteSweep } from "react-icons/md";
import useRemoveDeletedTasks from "../features/tasks/useRemoveDeletedTasks";

const StyledButtonDeleteAll = styled(StyledButtonCreateTask)`
  background-color: var(--theme-red);

  .light-theme & {
    color: var(--theme-white-400);
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  }
`;

export function ButtonDeleteAll() {
  const { cleanTrash } = useRemoveDeletedTasks();

  return (
    <StyledButtonDeleteAll backgroundColor="red" onClick={() => cleanTrash()}>
      {/* Use Tooltip instead of tip-prop to fix positioning bug */}
      <Tooltip content={"Empty the trash!"}>
        <MdDeleteSweep />
      </Tooltip>
    </StyledButtonDeleteAll>
  );
}
