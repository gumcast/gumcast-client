import { html } from 'uhtml-isomorphic'

const data = [
  {
    date: '2021-12-27',
    content: `UPDATE: Gumcast acquired an IP address flagged for malware from the free IP pool on Heroku which led to API request rejection from cloudflare.
      After redeploying and acquiring a new IP address, requests began to work again. All issues appear resolved for now.`
  },
  {
    date: '2021-12-27',
    content: `Due to upstream API changes, logins and feeds are not currently working.
      Gumcast is assessing options to address this.
      Keep existing feeds in your Podcast apps and they will resume working when a fix is figured out.`
  },
  {
    date: '2021-10-07',
    content: 'The ability to login restored. Rate limiting my still be in effect. Existing access tokens continue to work.'
  },
  {
    date: '2021-10-06',
    content: `Due to increasing service use, rate limiting is increasingly a problem. Also, logins are apparently not working. Looking into solutions.
      If you encounter errors, please try again later and the issue maybe resolved.`
  },
  {
    date: '2021-08-09',
    content: 'If you change cancel or change your subscription, you need to resubscribe to any feeds based on the old subscription.'
  }
]

export function updates () {
  return html`
<section>
  <h2>Updates</h2>
  <dl>
  ${data.map(update => html.for(update)`
    <dt>${update.date}</dt>
    <dd>${update.content}</dd>
    `)}
  </dl>
</section>
  `
}
