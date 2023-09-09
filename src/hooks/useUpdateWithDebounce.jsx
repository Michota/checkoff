import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

function useDebouncedUpdate(updater, ms) {
  const [updatedValue, setUpdatedValue] = useState(null);
  const debounce = useDebounce(updatedValue, ms);

  useEffect(
    function () {
      if (debounce !== null) updater(debounce);
      return setUpdatedValue(null);
    },
    [debounce, updater]
  );
  return setUpdatedValue;
}

function useUpdateWithDebounce(updater, ms = 2000) {
  if (updater === undefined) throw new Error("No updater was provided!");

  const setUpdatedValue = useDebouncedUpdate(updater, ms);
  return setUpdatedValue;
}

export { useUpdateWithDebounce };

/*
const setUpdatedValue = useUpdateWithDebounce( updateTask, 2000)

.
.
.

setUpdatedValue(updatedTask)
*/
