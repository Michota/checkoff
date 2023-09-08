import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../services/tasksAPI";
import { useEffect, useState } from "react";

function useTaskData() {
  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksData,
  });

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
