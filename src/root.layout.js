import { html } from 'uhtml-isomorphic'

export default async function rootLayout ({
  title,
  siteName,
  scripts,
  styles,
  children
}) {
  return html`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title ? `${title} | ` : ''}${siteName}</title>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
    <link rel="alternate icon" href="/favicon.ico" sizes="16x16 32x32 64x64 192x192" type="image/vnd.microsoft.icon">
    <link rel="mask-icon" type="image/svg+xml" href="/static/favicon.svg" color="#ee802f">
    <meta name="theme-color" content="#ee802f">
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="/static/apple-touch-icon-180x180.png">

    ${scripts
      ? scripts.map(script => html`<script src="${script}" type='module'></script>`)
      : null
    }
    ${styles
      ? styles.map(style => html`<link rel="stylesheet" href=${style} />`)
      : null
    }
  </head>
  <body class="safe-area-inset">
    <main class="mine-layout">
      ${typeof children === 'string' ? html([children]) : children}
    </main>
    <footer>
      © Gumcast · <a href="https://github.com/gumcast">Github</a> · <a href="https://github.com/gumcast/gumcast-client/issues">Contact</a>
    </footer>
  </body>
</html>`
}
