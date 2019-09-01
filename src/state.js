const assert = require('nanoassert')
module.exports = (name, opts = {}) => {
  assert(name, 'namepace required')
  const { defaults } = opts

  let state
  try {
    state = JSON.parse(window.localStorage.getItem(name)) || {}
  } catch (e) {
    state = {}
  }

  state = Object.assign(defaults, state)

  const handler = {
    get (obj, prop) {
      return obj[prop]
    },
    set (obj, prop, value) {
      obj[prop] = value
      try {
        window.localStorage.setItem(name, JSON.stringify(obj))
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    }
  }

  return new Proxy(state, handler)
}
