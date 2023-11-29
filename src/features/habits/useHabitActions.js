export default function useHabitActions(habitId, dispatch) {
  function editHabitName(newName) {
    dispatch({
      type: "habit/editName",
      payload: { id: habitId, data: newName },
    });
  }
  function editHabitColor(newColor) {
    dispatch({
      type: "habit/editColor",
      payload: { id: habitId, data: newColor },
    });
  }
  function editHabitDescription(newDescription) {
    dispatch({
      type: "habit/editDescription",
      payload: { id: habitId, data: newDescription },
    });
  }
  function editHabitIcon(newIcon) {
    dispatch({
      type: "habit/editIcon",
      payload: { id: habitId, data: newIcon },
    });
  }

  return {
    editHabitColor,
    editHabitDescription,
    editHabitIcon,
    editHabitName,
  };
}
