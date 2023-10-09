export function sortTasks(tasks, sortBy, ascending = true) {
  let method = typeof tasks?.[0][sortBy];
  let sortedTasks;

  if (sortBy === "startDate") {
    sortedTasks = ascending
      ? tasks?.sort(
          (b, a) =>
            new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        )
      : tasks?.sort(
          (a, b) =>
            new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        );
    return sortedTasks;
  }

  if (method === "number")
    sortedTasks = ascending
      ? tasks?.sort((b, a) => a[sortBy] - b[sortBy])
      : tasks?.sort((a, b) => a[sortBy] - b[sortBy]);
  // Sort by strings.
  if (method === "string")
    sortedTasks = ascending
      ? tasks.sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
            ? -1
            : b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
            ? 1
            : 0
        )
      : tasks.sort((b, a) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
            ? -1
            : b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
            ? 1
            : 0
        );

  // if there are no sortedTasks (length === 0), return non-sorted array.
  return sortedTasks || tasks;
}
