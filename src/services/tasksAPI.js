import supabase from "./supabase";

async function getTasksData() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) return error;

  return tasks;
}

export { getTasksData };
