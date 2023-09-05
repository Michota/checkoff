import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskComplete } from "../services/tasksAPI";
import { toast } from "react-hot-toast";

function useUpdateTaskComplete() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: ({ id, isCompleted }) =>
      updateTaskComplete({ id, isCompleted }),
    onSuccess: () => {
      toast.success('chuj!')
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { isUpdating, updateTask };
}

export { useUpdateTaskComplete };
