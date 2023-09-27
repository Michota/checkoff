import Button from "../../ui/Button";
import { MdRestoreFromTrash } from "react-icons/md";
import { useTaskContext } from "../Task";

function RestoreButton() {
  const { inTrash, updateState } = useTaskContext();
  if (inTrash)
    return (
      <Button
        btnType="restore"
        color="var(--theme-green)"
        onClick={(e) => {
          e.stopPropagation();
          updateState("inTrash", false);
        }}
      >
        <MdRestoreFromTrash />
      </Button>
    );
}

export default RestoreButton;
