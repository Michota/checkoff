import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask } from "../../services/tasksAPI";
import toast from "react-hot-toast";

function useCreateNewTask() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    mutate: createTask,
  } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: createNewTask,
    onSuccess: () => {
      // toast.success("New Task was created!"),
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      if (!error) return;
      toast.error(error);
    },
  });
  return { data, error, createTask };
}

export default useCreateNewTask;
