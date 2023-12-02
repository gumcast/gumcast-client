import { html } from 'uhtml-isomorphic'

export default async function LoginPage ({ vars }) {
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

  <h2>Gumroad Library</h2>
  <ul class="products" id="products">
    Loading...
  </ul>

  <div>
  <h3>Gumcast Updates</h3>

    ${html([vars.blogPostsHtml])}
  <div>
`
}
