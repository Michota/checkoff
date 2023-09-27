import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const SelectedTaskContext = createContext();

function SelectedTaskProvider({ children }) {
  const [taskId, setTaskId] = useState();

  return (
    <SelectedTaskContext.Provider value={{ taskId, setTaskId }}>
      {children}
    </SelectedTaskContext.Provider>
  );
}

function useSelectedTaskContext() {
  const value = useContext(SelectedTaskContext);
  if (value === undefined) throw new Error("There is no id of selected task.");
  return value;
}

export { useSelectedTaskContext };
export default SelectedTaskProvider;
