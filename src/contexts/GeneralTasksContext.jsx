import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useTasksState } from "../features/tasks/useTasksState";

const GeneralTasksContext = createContext();

function GeneralTasksProvider({ children }) {
  const [selectedTaskUUID, setSelectedTaskUUID] = useState("");

  const {
    data: localData,
    dispatch: localDispatcher,
    isLoadingRemoteData: isLoadingTasks,
  } = useTasksState();

  return (
    <GeneralTasksContext.Provider
      value={{
        localData,
        localDispatcher,
        isLoadingTasks,
        selectedTaskUUID,
        setSelectedTaskUUID,
      }}
    >
      {children}
    </GeneralTasksContext.Provider>
  );
}

function useGeneralTasksContext() {
  const value = useContext(GeneralTasksContext);
  if (value === undefined)
    throw new Error(
      "Something went wrong with GTC (General Tasks Context) or with it's provider."
    );
  return value;
}

export { useGeneralTasksContext, GeneralTasksProvider };
