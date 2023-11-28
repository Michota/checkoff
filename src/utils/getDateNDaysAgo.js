// ! TODO: Delete me later!
export function getDateNDaysAgo(n) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - n);
  return targetDate;
}
