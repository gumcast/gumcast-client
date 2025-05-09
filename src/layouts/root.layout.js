/**
 * @import { LayoutFunction } from 'top-bun'
 */

import { html, render } from 'uhtml-isomorphic'

/**
 * @typedef {{
 *  title: string,
 *  siteName: string,
 *  mastodonUrl: string,
 *  discordUrl: string
 * }} RootLayoutVars
 */

/** @type {LayoutFunction<RootLayoutVars>} */
export default async function rootLayout ({
  vars: {
    title,
    siteName,
    mastodonUrl,
    discordUrl
  },
  scripts,
  styles,
  children
}) {
  return render(String, html`
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

    <link rel="alternate" title="HifiWi.fi (JSON Feed)" type="application/json" href="/feed.json" />
    <link rel="alternate" title="HifiWi.fi (JSON Feed)" type="application/feed+json" href="/feed.json" />
    <link rel="alternate" title="HifiWi.fi (RSS Feed)" type="application/rss+xml"  href="/feed.xml" />

    <script src="https://analytics.ahrefs.com/analytics.js" data-key="bgR4vggCoN4BfX0BQn6H2w" async></script>

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
    <footer class="gumcast-footer">
      © <a href="https://hifiwi.fi">HifiWi.fi</a>
      <a href="/blog/">Blog</a>
      <a href="/faq/">FAQ</a>
      <a href="https://gumcast.betteruptime.com">Status</a>
      <a href="/feed.json"><img class="rounded-icon" height="14" width="14" src="/static/jsonfeed.svg"></a>
      <a href="/feed.xml"><img height="14" width="14" src="/static/rss.svg" ></a>
      <a href="${mastodonUrl}" rel="me"><img height="14" width="14" src="/static/mastodon.svg"></a>
      <a href="${discordUrl}" rel="me"><img height="14" width="14" src="/static/discord.svg"></a>
    </footer>
  </body>
</html>`)
}
