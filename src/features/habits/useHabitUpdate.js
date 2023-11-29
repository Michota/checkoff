import toast from "react-hot-toast";
import { updateHabitData } from "../../services/habitAPI";
import { useMutation } from "@tanstack/react-query";

export default function useHabitUpdate() {
  const {
    mutate: update,
    error,
    isLoading,
  } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (habit) =>
      toast.promise(updateHabitData(habit), {
        loading: "Updating habit...",
        success: "Habit updated sucesfully!",
        error: "There was an error with habit updating process!",
      }),
  });

  return { update, error, isLoading };
}
