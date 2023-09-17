export default function createDebounce() {
  let timeout;

  const debounce = (callback, instantClearTimeout) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (instantClearTimeout) {
      callback();
    }

    timeout = setTimeout(() => {
      callback();
    }, 1500);
  };

  return { debounce };
}
