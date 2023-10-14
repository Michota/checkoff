import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useEffect, useReducer, useState } from "react";
import { useUser } from "../authentication/useUser";

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

    default:
      return state;
  }
}

export function useLocalTasksState() {
  const { user } = useUser();
  const { data: dataFromRemote, isLoading: isLoadingRemoteData } = useQuery({
    queryKey: ["tasks", user.id],
    queryFn: () => getTasksData(user.id),
  });

  const [data, dispatch] = useReducer(reducer, []);

  // Update local-state if remote-state will be re-fetched.
  useEffect(
    function () {
      dispatch({ type: "tasks/loadFromRemote", payload: dataFromRemote });
    },
    [dataFromRemote]
  );

  return { data, dispatch, isLoadingRemoteData };
}
