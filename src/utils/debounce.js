const DEBOUNCE_TIME = 5000;

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
    }, DEBOUNCE_TIME);
  };

  return { debounce };
}
