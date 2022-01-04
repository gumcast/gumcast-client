import { html } from 'uhtml-isomorphic'
import { updates } from '../updates.js'
import { faq } from '../faq.js'

export default async function LoginPage () {
  return html`
  <nav class="header-nav">
  <div class="breadcrumb">
    <span>gumcast / <a href="#">library</a> /</span>
  </div>

  <div class="auth-buttons">
    <span class="account-name">loading...</span>
    <span><button class="logout">logout</button></span>
  </div>
  </nav>

  <h2>Library</h2>
  <ul class="products" id="products">
    Loading...
  </ul>

  ${updates()}

  ${faq()}
`
}
