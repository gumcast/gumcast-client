---
publishDate: 2021-12-27
layout: article
title: 'Login issues (resolved)'
---

Due to upstream API changes, logins and feeds are not currently working.
Gumcast is assessing options to address this.
Keep existing feeds in your Podcast apps and they will resume working when a fix is figured out.


*UPDATE*: Gumcast acquired an IP address flagged for malware from the free IP pool on Heroku which led to API request rejection from cloudflare.
After redeploying and acquiring a new IP address, requests began to work again. All issues appear resolved for now.
