import Habit from "../components/Habit";
import useHabitState from "../features/habits/useHabitState";

function Habits() {
  const { data, dispatch } = useHabitState();

  return (
    <>
      {data.map((habit, i) => {
        return <Habit key={habit.id} data={habit} dispatch={dispatch}></Habit>;
      })}
    </>
  );
}

export default Habits;
