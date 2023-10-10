import { useManageTaskData } from "./useManageTaskData";
import useTaskDelete from "./useTaskDelete";

function useRemoveDeletedTasks() {
  const { tasks } = useManageTaskData();
  const { deleteTask } = useTaskDelete();

  function cleanTrash() {
    tasks.forEach((task) => task.inTrash && deleteTask(task.id));
  }

  // setLocalAndUpdateRemote();
  return { cleanTrash };
}

export default useRemoveDeletedTasks;
