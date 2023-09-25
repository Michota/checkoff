import { useQuery } from "@tanstack/react-query";
import { getTasksData } from "../../services/tasksAPI";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
import createDebounce from "../../utils/debounce";
import useUpdateTask from "./useTaskUpdate";
import { useDebouncedCallback } from "use-debounce";

// const { debounce } = createDebounce();

/**
 * Stare for storing tasks data and updating it locally.
 * @param taskState - array containing all the tasks
 * @param setLocalTaskState - setter function for updating local state
 */

function useTaskData() {
  const { user } = useUser();
  const {
    isLoading,
    data: tasks,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["tasks", user.id],
    queryFn: () => getTasksData(user.id),
  });

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

  // * Placing local taskState here makes it easy to manipulate data locally without changing anything in remote state

  const [tasksState, setTasksState] = useState(tasks);

  // const { processChange: debounce } = createDebounce();
  const { updateTask: update, isUpdating: isUpdatingTasks } = useUpdateTask();

  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     // Your useEffect code here to be run on update
  //     console.log("UPDATE!!!");
  //   }
  // });
  const debounced = useDebouncedCallback(() => {
    const updatedTasks = tasksState.filter(
      (task) =>
        JSON.stringify(task) !==
        JSON.stringify(tasks.find((oldTask) => oldTask.id === task.id))
    );
    updatedTasks.forEach((task) => update(task));
  }, 3000);

  function setLocalAndUpdate(newLocalTasksState) {
    // 1. update tasks locally
    // 2. debounce
    // 3. if debounced timeout, run update for every
    // 3.1 tasksState.forEach(task => JSON.stringify(task) === JSON.stringify(oldTasks.find(oldTask.id === task.id)))
    setTasksState(newLocalTasksState);
    // console.log(newLocalTasksState);

    // console.log(updatedTasks);
    debounced();
    // updatedTasks.forEach((task) => update(task));
    // console.log(debouncedMemo);
  }

  useEffect(
    function () {
      setTasksState(tasks);
    },
    [tasks]
  );

  return { isLoading, tasksState, error, setLocalAndUpdate };
}

export default useTaskData;
