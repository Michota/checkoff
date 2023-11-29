import supabase from "./supabase";

export async function getHabitsData(userId) {
  let { data: habits, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error);

  return habits;
}
