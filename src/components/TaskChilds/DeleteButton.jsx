import Button from "../../ui/Button";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { useTaskContext } from "../Task";

function DeleteButton() {
  const { inTrash, deleteTask, id, updateState } = useTaskContext();
  return (
    <Button
      btnType="delete"
      onClick={(e) => {
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
