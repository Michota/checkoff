import supabase from "./supabase";

async function getTasksData() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) throw new Error(error);

  return tasks;
}

async function updateTaskData({ task, toUpdate }) {
  const {
    columnName, // * name of column inside supabase database
    newValue,
  } = toUpdate;

  const { id, isCompleted } = task;
  const { data, error } = await supabase
    .from("tasks")
    .update({ [columnName]: newValue })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export { getTasksData, updateTaskData };

async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error();

  return error;
}
