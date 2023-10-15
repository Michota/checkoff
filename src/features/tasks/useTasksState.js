import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useCallback, useEffect, useReducer } from "react";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import useUpdateTasks from "./useTasksUpdate";
import { reducer } from "./tasksReducer";

/**
 * The time that must elapse since the last edit of the state to start the update process
 * @type {number}
 *
 */
const DEBOUNCE_TIME_MS = 3000;

// Get newest state from remote state and save it locally
export function useTasksState() {
  // Get user information (id)
  const { user } = useUser();
  // Fetch data from database if its updated
  const {
    data: dataFromRemote,
    isLoading: isLoadingRemoteData,
    isPaused,
    status,
  } = useQuery({
    queryKey: ["tasks", user.id],
    queryFn: () => getTasksData(user.id),
  });

  const [data, dispatcher] = useReducer(reducer, []);
  const { updateTasks: pushToRemote } = useUpdateTasks();

  /**
   * Starts updating process if nothing hand changed in local state for a specified period of time
   */
  const debounceUpdate = useDebouncedCallback(
    () => {
      // Tasks that were updated locally.
      const updatedTasks = data.filter(
        (task) =>
          JSON.stringify(task) !==
          JSON.stringify(
            dataFromRemote.find((oldTask) => oldTask.id === task.id)
          )
      );

      // Create copy to not mutate original Array
      const clonedLocalTasks = JSON.parse(JSON.stringify(updatedTasks));

      // Remove Id's from newly created tasks (new, locally created tasks ID's are negative numbers.)
      clonedLocalTasks.forEach((task) => {
        if (task.id <= 0) {
          delete task.id;
          task.userId = user.id;
        }
      });
      // Tasks that were removed locally (from data)
      const removedLocalTasks = dataFromRemote.filter(
        (oldTask) =>
          JSON.stringify(oldTask) !==
          JSON.stringify(data.find((task) => task.id === oldTask.id))
      );
      // Push changes to remote
      pushToRemote([clonedLocalTasks, removedLocalTasks]);
    },
    // The time that must elapse to start update (in ms)
    DEBOUNCE_TIME_MS
  );

  /**
   * Dispatching action to localState reducer and starts debounced update.
   */
  const dispatch = useCallback(
    function dispatch(action) {
      dispatcher(action);
      debounceUpdate();
    },
    [debounceUpdate]
  );

  // Update local-state if remote-state will be re-fetched.
  useEffect(
    function () {
      if (status === "success") {
        dispatch({ type: "tasks/loadFromRemote", payload: dataFromRemote });
      }
    },
    [dataFromRemote, dispatch, status]
  );

  // Display notification if internet connection is lost.
  useEffect(
    function () {
      const timeout = setTimeout(() => {
        if (isPaused)
          toast.error("Check your internet connection...", {
            position: "top-center",
            icon: "🌐",
          });
      }, 3000);
      if (!isPaused)
        return () => {
          clearTimeout(timeout);
        };
    },
    [isPaused]
  );

  return { data, dispatch, isLoadingRemoteData };
}
