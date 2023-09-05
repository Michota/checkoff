import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../services/tasksAPI";

function useTaskData() {
  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksData,
  });

  return { isLoading, tasks, error };
}

export default useTaskData;
