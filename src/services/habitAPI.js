import supabase from "./supabase";

export async function getHabitsData(userId) {
  let { data: habits, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error);

  return habits;
}
export async function updateHabitData(habit) {
  console.log(habit);
  const { id } = habit;
  const { data, error } = await supabase
    .from("habits")
    .update({ ...habit })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}
