import { useDebounce } from "./useDebounce";

function useDebouncedUpdate(toObserve, ms, updateHandler) {
  const debouncedValue = useDebounce(toObserve, ms);

  useEffect(
    function () {
      if (!selectedTaskId) return;
      if (debounce)
        updateTask(
          debounce?.find((task) => task.id === selectedTaskId ?? undefined)
        );
    },
    [debounce, selectedTaskId, updateTask]
  );
}
