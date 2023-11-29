export default function reducer(state, action) {
  switch (action.type) {
    case "habit/loadFromRemote":
      return action.payload;
    case "habit/editName": {
      return state.map((habit) =>
        habit.id !== action.payload.id
          ? habit
          : { ...habit, name: action.payload.data }
      );
    }
    case "habit/editColor": {
      return state.map((habit) =>
        habit.id !== action.payload.id
          ? habit
          : { ...habit, color: action.payload.data }
      );
    }
    case "habit/editDescription": {
      return state.map((habit) =>
        habit.id !== action.payload.id
          ? habit
          : { ...habit, description: action.payload.data }
      );
    }
    case "habit/editIcon": {
      return state.map((habit) =>
        habit.id !== action.payload.id
          ? habit
          : { ...habit, icon: action.payload.data }
      );
    }
  }
}
