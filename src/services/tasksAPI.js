import supabase from "./supabase";

async function getTasksData(userId) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("userId", userId)
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

async function updateAllTasksData(tasks) {
  const { data, error } = await supabase.from("tasks").upsert(tasks).select();

  return data;
}

async function deleteTaskData(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

async function createNewTask(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ isCompleted: false, userId }])
    .select();

  if (error) throw new Error();

  return data;
}

export {
  getTasksData,
  updateTaskData,
  createNewTask,
  deleteTaskData,
  updateAllTasksData,
};
