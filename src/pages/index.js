const { document, render, html } = require('heresy-ssr')

const lang = 'en'

render(document, html`
  <html lang=${lang}>
    <head>
      <title>Gumcast | Login</title>
      <CustomElements/>
      <script defer src="//unpkg.com/heresy"></script>
      <script type="module" src="definitions.js"></script>
    </head>
    <body>
      Log in
    </body>
  </html>
`)

module.exports = document
