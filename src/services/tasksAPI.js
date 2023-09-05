import supabase from "./supabase";

async function getTasksData() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) throw new Error(error);

  return tasks;
}

async function updateTaskComplete({ id, isCompleted }) {
  console.log(id, isCompleted);

  const { data, error } = await supabase
    .from("tasks")
    .update({ isCompleted: !isCompleted })
    .eq("id", id)
    .select();

  console.log(data);

  if (error) throw new Error(error);

  return data;
}

export { getTasksData, updateTaskComplete };
