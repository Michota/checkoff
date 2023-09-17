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
  const { updateTask: update, isUpdating } = useUpdateTask();

  function saveUpdatedTask(updatedTask) {
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

  // function manageTask(id, request) {
  //   const task = tasks.find((t) => t.id === id);
  //   if (!task) throw new Error("Task with provided id was not found!");
  //   switch (request.type) {
  //     case "update":
  //   }
  // }

  return { saveUpdatedTask, tasks, setTasks, isLoadingTasks };
}
