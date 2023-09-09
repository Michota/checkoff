import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskData } from "../services/tasksAPI";
import { toast } from "react-hot-toast";

function useUpdateTask() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task) => {
      console.log(task);
      return updateTaskData(task);
    },
    onSuccess: () => {
      // toast.success("");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { isUpdating, updateTask };
}

export default useUpdateTask;
