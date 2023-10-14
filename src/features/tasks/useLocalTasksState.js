import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useReducer, useState } from "react";
import { useUser } from "../authentication/useUser";

function reducer(state, action) {
  switch (action.type) {
    case "task/update": {
      const taskToUpdate = state.find(
        (task) => task.id === action.payload.task.id
      );
      return state.map((task) =>
        task.id === taskToUpdate.id ? taskToUpdate : task
      );
    }
    case "task/delete": {
      const taskToDelete = state.find(
        (task) => task.id === action.payload.task.id
      );
      return state.filter((task) => task.id !== taskToDelete);
    }
    case "task/create": {
      const newTask = action.payload;
      return state.concat(newTask);
    }
  }
}

export function useLocalTasksState() {
  const { user } = useUser();
  const { data: dataFromRemote } = useQuery({
    queryKey: ["tasks", user.id],
    queryFn: () => getTasksData(user.id),
  });

  const [data, dispatch] = useReducer(reducer, dataFromRemote);

  return { data, dispatch };
}
