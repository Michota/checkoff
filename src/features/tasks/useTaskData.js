import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
import useUpdateTask from "./useTaskUpdate";
import { useDebouncedCallback } from "use-debounce";

/**
 * Stare for storing tasks data and updating it locally.
 * @param taskState - array containing all the tasks
 * @param setLocalTaskState - setter function for updating local state
 */

function useTaskData() {
  const { user } = useUser();
  const {
    isLoading,
    data: tasks,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["tasks", user.id],
    queryFn: () => getTasksData(user.id),
  });

  // Display notification if internet connection is lost.
  useEffect(
    function () {
      const timeout = setTimeout(() => {
        if (isPaused)
          toast.error("Check your internet connection...", {
            position: "top-center",
            icon: "🌐",
          });
      }, 3000);
      if (!isPaused)
        return () => {
          clearTimeout(timeout);
        };
    },
    [isPaused]
  );

  // * Placing local taskState here makes it easy to manipulate data locally without changing anything in remote state

  const [tasksState, setTasksState] = useState(tasks);

  const { updateTask: update } = useUpdateTask();

  const debounceUpdate = useDebouncedCallback(
    () => {
      const updatedTasks = tasksState.filter(
        (task) =>
          JSON.stringify(task) !==
          JSON.stringify(tasks.find((oldTask) => oldTask.id === task.id))
      );
      update(updatedTasks);
    },
    // The time that must elapse to run the update
    10000
  );

  function setLocalAndUpdateRemote(newLocalTasksState) {
    // Update local state
    setTasksState(newLocalTasksState);
    // Update remote state a few seconds after user will stop updating local state.
    debounceUpdate();
  }

  // Check whether remote state was updated and if it was then update local state.
  useEffect(
    function () {
      setTasksState(tasks);
    },
    [tasks]
  );

  return { isLoading, tasksState, error, setLocalAndUpdateRemote };
}

export default useTaskData;
