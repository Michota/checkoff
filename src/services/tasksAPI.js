import supabase from "./supabase";

async function getTasksData() {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error);

  return tasks;
}

async function updateTaskData(task) {
  const { id } = task;
  const { data, error } = await supabase
    .from("tasks")
    .update({ ...task })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export { getTasksData, updateTaskData };

async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error();

  return error;
}
