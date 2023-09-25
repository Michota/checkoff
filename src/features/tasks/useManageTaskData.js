import useTaskData from "./useTaskData";
import useUpdateTask from "./useTaskUpdate";

export function useManageTaskData() {
  const {
    tasksState: tasks,
    setTasksState: setTasks,
    isLoading: isLoadingTasks,
    setLocalAndUpdateRemote,
  } = useTaskData();
  const { isUpdating: isUpdatingTasks } = useUpdateTask();

  function saveAndUpdateTask(updatedTask) {
    // set
    setLocalAndUpdateRemote(
      tasks.map((task) => (task.id !== updatedTask.id ? task : updatedTask))
    );
  }

  return {
    saveAndUpdateTask,
    tasks,
    setTasks,
    isLoadingTasks,
    isUpdatingTasks,
  };
}
