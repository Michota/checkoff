import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskData } from "../services/tasksAPI";
import { toast } from "react-hot-toast";

function useTaskDelete() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task) => {
      return toast.promise(deleteTaskData(task), {
        loading: "Deleting task...",
        success: "Tasks was deleted forever!",
        error: "There was an error! Task was not deleted.",
      });
    },
    onSuccess: () => {
      // toast.success("Tasks was deleted forever!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { isDeleting, deleteTask };
}

export default useTaskDelete;
