import Button from "../../ui/Button";
import { MdDeleteForever } from "react-icons/md";
import { useTaskContext } from "../Task";

function DeleteButton() {
  const { deleteTask, id } = useTaskContext();

  return (
    <Button
      type="delete"
      onClick={(e) => {
        e.stopPropagation();
        deleteTask(id);
      }}
    >
      <MdDeleteForever />
    </Button>
  );
}

export default DeleteButton;
