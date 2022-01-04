import { html } from 'uhtml-isomorphic'
import { updates } from './updates.js'
import { faq } from './faq.js'

export default async function LoginPage () {
  return html`
  <nav class="header-nav">

  <div class="breadcrumb">
    <span><a href="#">gumcast</a> / </span>
  </div>

  <div class="auth-buttons"></div>

</nav>

<header class="logo-header">
  <img height="150" width="150" src="/static/logo.svg">
  <h1>gumcast</h1>
  <small>Subscribe to Gumroad with a podcast app</small>
</header>

<form class="login-form" id="login-form">
  <fieldset>
    <legend>Log into your Gumroad account:</legend>
    <div>
      <label for="username">Email:</label>
      <input class="big-input" type="text" name="username" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input class="big-input" type="password" name="password">
    </div>
    <div class="button-cluster">
      <input name="submit-button" type="submit">
    </div>
    <div class="error-box"></div>
  </fieldset>
</form>

${updates()}

${faq()}
  `
}
