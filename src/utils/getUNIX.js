export default function getUNIX(d) {
  if (!d) return new Date().getTime();
  return new Date(d).getTime();
}
