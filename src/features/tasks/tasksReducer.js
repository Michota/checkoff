export function reducer(state, action) {
  switch (action.type) {
    case "tasks/loadFromRemote": {
      return action.payload;
    }

    case "tasks/updateTask": {
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    }

    case "tasks/deleteTask": {
      const taskIdToBeDeleted = action.payload;
      return state.filter((task) => task.id !== taskIdToBeDeleted);
    }

    case "tasks/createTask": {
      // tasks with a negative ID are only stored in the local state,
      // and their IDs will be replaced after pushing state to remote state
      const newTask = action?.payload
        ? // If there is data provided with payload
          {
            ...action.payload,
            id: -(state.length + 1),
            uuid: crypto.randomUUID(),
          }
        : // If there is no data provided with payload
          {
            createdAt: new Date().toISOString(),
            descjson: null,
            endDate: null,
            inTrash: false,
            isCompleted: false,
            priority: 0,
            startDate: null,
            title: "",
            id: -(state.length + 1),
            uuid: crypto.randomUUID(),
          };

      return state.concat(newTask);
    }
  }
}
