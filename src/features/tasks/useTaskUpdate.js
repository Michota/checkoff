import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskData } from "../../services/tasksAPI";
import { toast } from "react-hot-toast";

function useUpdateTask() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task) => {
      return toast.promise(updateTaskData(task), {
        loading: "Updating task...",
        success: "Task was sucesfully updated!",
        error: "There was an error! Task was not updated.",
      });
    },
    onSuccess: () => {
      // toast.success("Tasks were synchronized successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      return toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { isUpdating, updateTask };
}

export default useUpdateTask;