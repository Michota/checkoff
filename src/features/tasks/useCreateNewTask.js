import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask, createNewTaskWithData } from "../../services/tasksAPI";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
import { useGeneralTasksProvider } from "../../contexts/GeneralTasksContext";

function useCreateNewTask() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { setSelectedTaskId } = useGeneralTasksProvider();

  const {
    data,
    error,
    mutate: createTask,
  } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (data) => {
      if (!data) return createNewTask(user.id);
      if (data)
        return createNewTaskWithData({
          ...data,
          userId: user.id,
          isCompleted: false,
        });
    },
    onSuccess: (e) => {
      // toast.success("New Task was created!"),
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSelectedTaskId(e[0].id);
      // setSelectedTaskId(e.id)
    },
    onError: () => {
      if (!error) return;
      toast.error(error);
    },
  });

  return { data, error, createTask };
}

export default useCreateNewTask;
