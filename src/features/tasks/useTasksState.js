import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useCallback, useEffect, useReducer } from "react";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import useUpdateTasks from "./useTasksUpdate";

function reducer(state, action) {
  switch (action.type) {
    case "tasks/loadFromRemote": {
      return action.payload;
    }

    case "tasks/updateTask": {
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    }

    case "tasks/deleteTask": {
      const taskIdToBeDeleted = action.payload;
      return state.filter((task) => task.id !== taskIdToBeDeleted);
    }

    case "tasks/createTask": {
      // tasks with a negative ID are only stored in the local state,
      // and their IDs will be replaced after pushing state to remote state
      const newTask = action?.payload
        ? // If there is data provided with payload
          { ...action.payload, id: -(state.length + 1) }
        : // If there is no data provided with payload
          {
            createdAt: new Date().toISOString(),
            descjson: null,
            endDate: null,
            inTrash: false,
            isCompleted: false,
            priority: 0,
            startDate: null,
            title: "",
            id: -(state.length + 1),
          };

      return state.concat(newTask);
    }
  }
}

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

  const debounceUpdate = useDebouncedCallback(
    () => {
      const updatedTasks = data.filter(
        (task) =>
          JSON.stringify(task) !==
          JSON.stringify(
            dataFromRemote.find((oldTask) => oldTask.id === task.id)
          )
      );
      // Remove Id's from newly created tasks (new, locally created tasks ID's are negative numbers.)
      const noIdTasks = JSON.parse(JSON.stringify(updatedTasks));
      noIdTasks.forEach((task) => {
        if (task.id <= 0) {
          delete task.id;
          task.userId = user.id;
        }
      });
      pushToRemote(noIdTasks);
    },
    // The time that must elapse to run the update (in ms)
    2000
  );

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
        console.log(dataFromRemote);
        dispatch({ type: "tasks/loadFromRemote", payload: dataFromRemote });
      }
    },
    [dataFromRemote, dispatch]
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

  return { data, dispatch, isLoadingRemoteData, dataFromRemote };
}
