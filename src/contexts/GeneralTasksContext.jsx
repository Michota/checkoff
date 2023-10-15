import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useTasksState } from "../features/tasks/useTasksState";

const GeneralTasksContext = createContext();

function GeneralTasksProvider({ children }) {
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const {
    data: localData,
    dispatch: localDispatcher,
    isLoadingRemoteData: isLoadingTasks,
    dataFromRemote: remoteData,
  } = useTasksState();

  return (
    <GeneralTasksContext.Provider
      value={{
        localData,
        localDispatcher,
        isLoadingTasks,
        selectedTaskId,
        setSelectedTaskId,
        remoteData,
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
