import createDebounce from "../utils/debounce";
import useTaskData from "./useTaskData";
import useUpdateTask from "./useTaskUpdate";

const { debounce } = createDebounce();
let currentlyUpdatedTask;

export function useManageTaskData() {
  const {
    tasksState: tasks,
    setTasksState: setTasks,
    isLoading: isLoadingTasks,
  } = useTaskData();
  const { updateTask: update, isUpdating: isUpdatingTasks } = useUpdateTask();

  function saveAndUpdateTask(updatedTask) {
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id !== updatedTask.id ? task : updatedTask
      );
    });

    const isCurrentlyUpdating = currentlyUpdatedTask?.id !== updatedTask?.id;
    debounce(() => {
      if (currentlyUpdatedTask?.id) update(currentlyUpdatedTask);
    }, isCurrentlyUpdating);
    currentlyUpdatedTask = updatedTask;
  }

  return {
    saveAndUpdateTask,
    tasks,
    setTasks,
    isLoadingTasks,
    isUpdatingTasks,
  };
}
