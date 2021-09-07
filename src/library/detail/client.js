import { fetch } from 'fetch-undici'
import { route } from '../../scripts/router.js'
import { state } from '../../scripts/state.js'

route()

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', async (ev) => {
  const currentUser = state.currentUser
  delete state.tokens[currentUser]
  state.currentUser = null
  route()
})

document.onreadystatechange = async () => {
  console.log(document.readyState)
  if (document.readyState === 'complete') {
    return Promise.all([
      populateJSONFeed(),
      populateRSSFeed()
      // updateNav()
    ])
  }
}

async function populateJSONFeed () {
  const jsonEl = document.querySelector('.json-feed')
  const titleEl = document.querySelector('.product-name')

  const params = new URLSearchParams(window.location.search)
  const purchaseId = params.get('purchase_id')

  if (!purchaseId) {
    jsonEl.innerText = 'missing required purchase_id search param'
  }

  const tokenBundle = state.tokens[state.currentUser]

  const reqParams = new URLSearchParams({
    access_token: tokenBundle.access_token,
    refresh_token: tokenBundle.refresh_token,
    purchase_id: purchaseId
  })

  try {
    const res = await fetch(`https://gumcast.com/api/feed.json?${reqParams.toString()}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors'
    })

    if (res.status !== 200) {
      const err = new Error('Response status !== 200')
      err.res = res
      throw err
    }

    const body = await res.json()

    jsonEl.innerText = JSON.stringify(body, null, '  ')
    titleEl.innerText = body.title
  } catch (e) {
    console.error(e)
  }
}

async function populateRSSFeed () {
  const rssEl = document.querySelector('.rss-feed')

  const params = new URLSearchParams(window.location.search)
  const purchaseId = params.get('purchase_id')

  if (!purchaseId) {
    rssEl.innerText = 'missing required purchase_id search param'
  }

  const tokenBundle = state.tokens[state.currentUser]

  const reqParams = new URLSearchParams({
    access_token: tokenBundle.access_token,
    refresh_token: tokenBundle.refresh_token,
    purchase_id: purchaseId
  })

  try {
    const res = await fetch(`https://gumcast.com/api/feed.rss?${reqParams.toString()}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors'
    })

    if (res.status !== 200) {
      const err = new Error('Response status !== 200')
      err.res = res
      throw err
    }

    const body = await res.text()

    rssEl.innerText = JSON.stringify(body, null, '  ')
  } catch (e) {
    console.error(e)
  }
}
