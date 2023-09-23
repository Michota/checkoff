import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Stare for storing tasks data and updating it locally.
 * @param taskState - array containing all the tasks
 * @param setTasksState - setter function for updating local state
 */
function useTaskData() {
  const {
    isLoading,
    data: tasks,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksData,
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

  useEffect(
    function () {
      setTasksState(tasks);
    },
    [tasks]
  );

  return { isLoading, tasksState, setTasksState, error };
}

export default useTaskData;
