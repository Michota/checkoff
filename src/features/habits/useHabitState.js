import { useQuery } from "@tanstack/react-query";
import { useUser } from "../authentication/useUser";
import { getHabitsData } from "../../services/habitAPI";
import { useEffect, useReducer } from "react";
import reducer from "./habitReducer";

// Load data from remote with reducer by overwriting its state

export default function useHabitState() {
  // Get user information (id)
  const { user } = useUser();

  // Use useQuery to get habitsData
  const { data: dataFromRemote, status } = useQuery({
    queryKey: ["habits", user.id],
    queryFn: () => getHabitsData(user.id),
  });

  const [data, dispatch] = useReducer(reducer, []);

  function loadFromRemote(dataFromRemote) {
    dispatch({ type: "habit/loadFromRemote", payload: dataFromRemote });
  }

  useEffect(
    function () {
      if (status === "success") {
        loadFromRemote(dataFromRemote);
      }
    },
    [dataFromRemote, status]
  );

  return {
    data,
    dispatch,
  };
}
