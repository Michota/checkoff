import { useGeneralTasksProvider } from "../../contexts/GeneralTasksContext";

function useRemoveDeletedTasks() {
  const { localData: tasks, localDispatcher } = useGeneralTasksProvider();

  function cleanTrash() {
    tasks.forEach(
      (task) =>
        task.inTrash &&
        localDispatcher({ type: "tasks/deleteTask", payload: task.id })
    );
  }

  return { cleanTrash };
}

export default useRemoveDeletedTasks;
