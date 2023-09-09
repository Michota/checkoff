import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../services/tasksAPI";
import { useEffect, useState } from "react";

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
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksData,
  });

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
