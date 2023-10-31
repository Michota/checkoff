import Button from "../ui/Button";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { useTaskContext } from "../Task";
import { useGeneralTasksContext } from "../../contexts/GeneralTasksContext";
import { Tooltip } from "../Tooltip";

function DeleteButton() {
  const { inTrash, deleteTask, id, updateState } = useTaskContext();
  const { setSelectedTaskUUID } = useGeneralTasksContext();

  return (
    <Button
      tip={inTrash ? "Delete forever!" : "Move to trash"}
      btnType="delete"
      onClick={(e) => {
        setSelectedTaskUUID(null);
        if (inTrash) {
          e.stopPropagation();
          deleteTask(id);
        } else {
          e.stopPropagation();
          updateState("inTrash", true);
        }
      }}
    >
      {inTrash ? <MdDeleteForever /> : <MdDelete />}
    </Button>
  );
}

export default DeleteButton;
