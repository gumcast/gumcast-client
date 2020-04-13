import { route } from '/scripts/router.js'
import { state } from '/scripts/state.js'
import { render, html } from 'https://unpkg.com/lighterhtml@^3?module'

const fetch = window.fetch

route()

const accountName = document.querySelector('.account-name')
accountName.innerText = state.currentUser

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
    return populateProducts()
  }
}

async function populateProducts () {
  const tokenBundle = state.tokens[state.currentUser]

  const params = new URLSearchParams({
    access_token: tokenBundle.access_token,
    refresh_token: tokenBundle.refresh_token
  })

  try {
    const res = await fetch(`${state.apiUrl}/products?${params.toString()}`, {
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
    const list = body.products
    console.log(body)
    const productEl = document.querySelector('#products')
    render(
      productEl, html.for(productEl)`${
        list.map(item => {
          const clientParams = new URLSearchParams({
            purchase_id: item.purchase_id
          })

          const feedParams = new URLSearchParams({
            purchase_id: item.purchase_id,
            access_token: tokenBundle.access_token,
            refresh_token: tokenBundle.refresh_token,
            proxyFiles: true
          })
          return html.for(item, productEl.id)`
            <li>
              <h5 class="title">
                <a href="/library/detail/?${clientParams.toString()}">${item.name}</a>
              </h5>
              <div class="image" style="background: url(${item.preview_url}); background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
              <div>
                RSS Feed: <input onclick="this.select();" id="rss-feed-url-${item.purchase_id}" type="text" readonly value="${state.apiUrl}/feed.rss?${feedParams.toString()}"></input>
                  <button onclick=${async () => {
                    try {
                      await navigator.clipboard.writeText(document.getElementById(`rss-feed-url-${item.purchase_id}`).value)
                      console.log('copied feed to clipboard')
                    } catch (e) {
                      console.error(e)
                    }
                  }}>Copy</button>
              </div>
            </li>`
          })
      }`
    )
  } catch (e) {
    console.error(e)
  }
}
