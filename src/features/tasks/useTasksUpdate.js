import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTasksState } from "../../services/tasksAPI";
import { toast } from "react-hot-toast";

function useUpdateTasks() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTasks } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (tasks) => {
      return toast.promise(updateTasksState(tasks), {
        loading: "Updating tasks...",
        success: "Tasks were sucesfully updated!",
        error: "There was an error! Tasks were not updated.",
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

  return { isUpdating, updateTasks };
}

export default useUpdateTasks;
