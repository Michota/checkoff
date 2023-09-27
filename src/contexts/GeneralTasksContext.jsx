import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useManageTaskData } from "../features/tasks/useManageTaskData";

const GeneralTasksContext = createContext();

function GeneralTasksProvider({ children }) {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const {
    saveAndUpdateTask,
    tasks,
    setTasks,
    isLoadingTasks,
    isUpdatingTasks,
  } = useManageTaskData();

  return (
    <GeneralTasksContext.Provider
      value={{
        saveAndUpdateTask,
        tasks,
        setTasks,
        isLoadingTasks,
        isUpdatingTasks,
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

export { useGeneralTasksProvider };
export default GeneralTasksProvider;
