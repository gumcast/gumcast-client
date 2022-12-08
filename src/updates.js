import { html } from 'uhtml-isomorphic'

const data = [
  {
    date: '2022-12-08',
    content: `Gumcast shipped improved stream support today. Most podcast clients don't know what to do with hls stream playlists, but some sort of support it (Like apple podcasts).
    Ideally gumroad products support media content downloads for the best experience with gumcast. For those that don't however, gumcast will at least get you to the stream URL.`
  },
  {
    date: '2022-11-27',
    content: html`
      Gumcast has identified a number of access tokens that appear to have been shared to a large number of users and
      will begin the process of disabling feeds that meet this criteria. If your podcast subscription suddenly stops working, or you see
      a warning message in your podcast feed, log back into Gumcast.com and grab a new RSS feed URL and re-subscribe to the new URL and unsubscribe from the disabled feed. You will lose
      playback state most likely. Please ensure that these feeds are not shared or added to globally available podcast directories. If you
      are not the subscription owner, please support your favorite creators and create your own Gumroad subscription and then create your personal
      RSS feed URL on gumcast.com. Questions issues or comments can be directed to support@hifiwi.fi
   `
  },
  {
    date: '2022-11-19',
    content: html`Gumcast has migrated hosting companies which means that podcast feed subscriptions URLs will change.
      Podcast apps should update automatically feeds from <code>gumcast-api.herokuapp.com</code> to <code>api.gumcast.com</code>, however sometimes this process fails due to bad podcast client behavior.
      If you experience issues with your feed no longer updating, you may need to log into gumcast and generate a new feed URL, unsubscribe from your old subscription in your podcast app and re-add the new URL.
      Apologies for the inconvenience. Old podcast feed URLs will work until November 28, 2022.`
  },
  {
    date: '2022-04-08',
    content: `Gumcast remains fully operational. 
      Since our December 2021 incident, Gumcast added extensive backend monitoring to more quickly detect and fix service interuptions.`
  },
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
