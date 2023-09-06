import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../services/tasksAPI";

function useUpdateTask() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task) => updateTask(task),
    onSuccess: () => {
      // toast.success('')
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { isUpdating, updateTask };
}

export default useUpdateTask;
