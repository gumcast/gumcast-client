const Component = require('hui')
const html = require('hui/html')
const css = require('csjs2')
const assert = require('nanoassert')
const config = require('../config.js')
const bent = require('bent')

const styles = css`
  .green {
    color: green;
  }
`

module.exports = class LoginForm extends Component {
  constructor ({ onlogin } = {}) {
    super()
    assert(onlogin && typeof onlogin === 'function', 'Must pass an onlogin function')
    this._onlogin = onlogin

    this._handleLogin = this._handleLogin.bind(this)
  }

  _handleLogin (ev) {
    ev.preventDefault()
    debugger
    const values = formValues(ev.target)
    console.log(values)
    const submitButton = this.element.querySelector('button[type="submit"]')
    // submitButton.disabled = true
    try {
      // const post = bent(config.apiUrl, 'POST', 'json', 200)
      // const tokenBundle = await post('/login', {})
      // this._onlogin(ev)
    } catch (e) {

    }
  }

  createElement () {
    return html`
        <div>
          <form novalidate onsubmit=${this._handleLogin}>
            <label class="${styles.green}" for="username">Username</label>
            <input id="username">
            <label for="password">Password</label>
            <input type="password" id="password">
            <button type="submit">Submit</button>
          </form>
        </div>`
  }
}

function formValues (formElement) {
  return Array.from(new window.FormData(formElement).entries())
    .reduce(function (obj, [key, value]) {
      obj[key] = value
      return obj
    }, {})
}
