import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskComplete } from "../services/tasksAPI";

function useUpdateTaskComplete() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task) => updateTaskComplete(task),
    onSuccess: () => {
      // toast.success('')
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { isUpdating, updateTask };
}

export { useUpdateTaskComplete };
