export default {
  function: (fn) => {
    if (typeof fn === 'function') {
      return fn()
    }
  }
}