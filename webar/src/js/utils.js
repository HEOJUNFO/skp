export function debounce(callBack, delay, options) {
  let timeout;
  options.leading = options.leading ? options.leading : false;
  return (args) => {
    if(options.leading === true) {
      callBack(args);
      options.leading = false;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBack(args);
    }, delay)
  }
}