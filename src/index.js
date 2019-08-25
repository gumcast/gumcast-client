const { define, html, render, ref } = require('heresy')

const LoginForm = {
  extends: 'form',
  name: 'LoginForm',
  oninit () {
    this.addEventListener('submit', this)
  },
  render () {
    return this.html`
      <fieldset>
        <legend>Log in</legend>
        <label for="username">Username:</label>
        <input type="text" name="username" />
        <label for="password">Password:</label>
        <input type="password" name="password">
        <input type="submit">
      </fieldset>`
  },
  reset () {
    this.submit.disabled = false
    this.username.disabled = false
    this.password.disabled = false
  },
  disable () {
    this.submit.disabled = true
    this.username.disabled = true
    this.password.disabled = true
  },
  onsubmit (ev) {
    ev.preventDefault()
    console.log(ev)
    console.log('form')
  }
}

const gumcastClient = {
  extends: 'element',
  name: 'GumcastClient',
  state: {
    session: null
  },
  includes: { LoginForm },
  onsubmit (ev) {
    ev.preventDefault()
    console.log(ev)
    console.log('client')
  },

  oninit () {},

  render () {
    return this.html`
      <LoginForm onsubmit=${this}/>
    `
  }
}

define(gumcastClient)

render(document.querySelector('#app-container'), html`<GumcastClient />`)
