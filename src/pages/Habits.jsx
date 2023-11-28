import Habit from "../components/Habit";
import { getDateNDaysAgo } from "../utils/getDateNDaysAgo";

// ! TODO: Delete me later!
// Not every year is 364 days long!!!
const habitDaysArr = Array.from({ length: 80 }, (el, i) => {
  return {
    score: Math.floor(Math.random() * 6),
    date: getDateNDaysAgo(i),
  };
});

const data = {
  name: "Habit Name",
  description: "Habit description",
  days: habitDaysArr,
};

function Habits() {
  return (
    <>
      <Habit data={data}></Habit>
    </>
  );
}

export default Habits;
