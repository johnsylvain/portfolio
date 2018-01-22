export function throttle(func, threshhold, scope) {
  let wait = false

  return function() {
    if (!wait) {
      func.apply(scope, arguments)
      wait = true
      setTimeout(function() {
        wait = false
      }, threshhold)
    }
  }
}

export const compose = (...fns) => (initialValue) =>
  fns.reduce((val, fn) => fn(val), initialValue)