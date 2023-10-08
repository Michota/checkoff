import Button from "../../ui/Button";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { useTaskContext } from "../Task";
import { useGeneralTasksProvider } from "../../contexts/GeneralTasksContext";
import { Tooltip } from "../Tooltip";

function DeleteButton() {
  const { inTrash, deleteTask, id, updateState } = useTaskContext();
  const { setSelectedTaskId } = useGeneralTasksProvider();

  return (
    <Tooltip content="Move task to trash">
      <Button
        btnType="delete"
        onClick={(e) => {
          setSelectedTaskId(null);
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
    </Tooltip>
  );
}

export default DeleteButton;
