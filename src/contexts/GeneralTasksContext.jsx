import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useLocalTasksState } from "../features/tasks/useLocalTasksState";

const GeneralTasksContext = createContext();

function GeneralTasksProvider({ children }) {
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const {
    data: localData,
    dispatch: localDispatcher,
    isLoadingRemoteData: isLoadingTasks,
  } = useLocalTasksState();

  return (
    <GeneralTasksContext.Provider
      value={{
        localData,
        localDispatcher,
        isLoadingTasks,
        selectedTaskId,
        setSelectedTaskId,
      }}
    >
      {children}
    </GeneralTasksContext.Provider>
  );
}

function useGeneralTasksProvider() {
  const value = useContext(GeneralTasksContext);
  if (value === undefined)
    throw new Error(
      "Something went wrong with GTC (General Tasks Context) or with it's provider."
    );
  return value;
}

export { useGeneralTasksProvider, GeneralTasksProvider };
