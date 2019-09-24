const { define, html, render, ref } = require('heresy')
const cfg = require('./config')
const bent = require('bent')
const CustomEvent = require('@ungap/custom-event')
const state = require('local-storage-proxy')('gumcast', {
  defaults: {
    tokens: [],
    currentUser: null
  }
})

window.state = state

const LoginForm = {
  extends: 'form',
  name: 'LoginForm',
  oninit () {
    this.addEventListener('submit', this)
    this.fieldSet = ref()
  },
  get error () {
    return this._error
  },
  set error (err) {
    this._error = err
    this.render()
  },
  render () {
    return this.html`
      <fieldset ref=${this.fieldSet}>
        <legend>Log in</legend>
        <p>Log into your Gumroad account</p>
        <label for="username">Email:</label>
        <input type="text" name="username" />
        <label for="password">Password:</label>
        <input type="password" name="password">
        <input name="submit-button" type="submit">
        ${this.error && html`<div>${this.error.message}</div>`}
      </fieldset>`
  },
  onsubmit (ev) {
    ev.preventDefault()
    this.error = null
    this.fieldSet.current.disabled = true

    const passwordBundle = {
      password: this.password.value.trim(),
      username: this.username.value.trim()
    }

    this.handleSubmit(passwordBundle).then((tokenBundle) => {
      this.fieldSet.current.disabled = false
      const loginEvent = new CustomEvent('login', { detail: {
        tokenBundle,
        username: passwordBundle.username
      } })
      this.dispatchEvent(loginEvent)
    }).catch(err => {
      this.fieldSet.current.disabled = false
      this.error = err
    })
  },
  handleSubmit (passwordBundle) {
    const post = bent(cfg.api, 'POST', 'json', 200)
    return post('/login', passwordBundle)
  }
}

const ProductView = {
  extends: 'element',
  name: 'ProductView',
  oninit (ev) {
    this.logoutButton = ref()
  },
  render () {
    return this.html`<div>
      <p>logged in as ${this.currentUser}</p>
      <button ref="${this.logoutButton}">Logout</button>
    </div>`
  },
  onclick (ev) {
    const { logoutButton } = this
    const { currentTarget } = ev
    switch (currentTarget) {
      case logoutButton.current: {
        state.currentUser = null
      }
    }
  }
}

const gumcastClient = {
  extends: 'element',
  name: 'GumcastClient',
  state: {
    session: null
  },
  includes: { LoginForm, ProductView },
  oninit (ev) {},
  render () {
    const currentUser = state.currentUser
    const token = state.tokens[currentUser]
    if (state.currentUser && state.tokens[state.currentUser]) {
      return this.html`<ProductView
                            onlogout="${this}"
                            .token="${token}"
                            .currentUser="${currentUser}"/>`
    } else {
      return this.html`<LoginForm onlogin="${this}" />`
    }
  },
  onlogin (ev) {
    const {
      tokenBundle,
      username
    } = ev.detail
    state.currentUser = username
    state.tokens[username] = tokenBundle
    this.render()
  },
  onlogout (ev) {
    this.creds = null
    this.render()
  }
}

define(gumcastClient)

render(document.querySelector('#app-container'), html`<GumcastClient />`)
