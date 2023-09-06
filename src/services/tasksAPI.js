import supabase from "./supabase";

async function getTasksData() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) throw new Error(error);

  return tasks;
}

async function updateTaskComplete(task) {
  const { id, isCompleted } = task;
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

async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error();

  return error;
}
