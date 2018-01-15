export function throttle(func, threshhold, scope) {
  let wait = false

  return function() {
    if (!wait) {
      func.apply(scope, arguments);
      wait = true;
      setTimeout(function() {
        wait = false
      }, threshhold);
    }
  }
}

export const compose = (...fns) => (initialValue) =>
  fns.reduce((val, fn) => fn(val), initialValue)

export const uuid = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )