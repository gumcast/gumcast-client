const Component = require('hui')
const html = require('hui/html')
const css = require('csjs')
const assert = require('nanoassert')

module.exports = class LoginForm extends Component {
  constructor ({ onlogin } = {}) {
    super()
    assert(onlogin && typeof onlogin === 'function', 'Must pass an onlogin function')
    this._onlogin = onlogin
  }

  _handleLogin (ev) {
    ev.preventDefault()
    console.log(ev)
  }

  createElement () {
    return html`
        <form>
          <label for="username">Username</label>
          <input id="username">
          <label for="password">Password</label>
          <input type="password" id="password">
        </form>`
  }
}
