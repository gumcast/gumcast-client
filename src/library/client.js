import { render, html } from 'uhtml-isomorphic'
import { fetch } from 'fetch-undici'
import { route } from '../scripts/router.js'
import { state } from '../scripts/state.js'

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

    const productEl = document.querySelector('#products')
    render(
      productEl, html.for(productEl)`${
        list.reverse().map(item => {
          const feedParams = new URLSearchParams({
            purchase_id: item.purchase_id,
            access_token: tokenBundle.access_token,
            refresh_token: tokenBundle.refresh_token
          })

          const feedURL = `${state.apiUrl}/feed.rss?${feedParams.toString()}`

          return html.for(item, productEl.id)`
            <li>
              <h5 class="title">
                <a href="${'https://gumroad.com/l/' + item.unique_permalink}">${item.name}</a>
              </h5>
              <div class="image" style="${`background: url(${item.preview_url}); background-repeat: no-repeat; background-size: cover; background-position: center;`}"></div>
              <div class="feed-line">
                <a class="feed-link" href="${feedURL}"><img width="38" src="/static/atom.svg" /></a>
                <div><input class="feed-select" onclick="this.select();" id="${'rss-feed-url-' + item.purchase_id}" type="text" readonly value="${feedURL}"></input></div>
                <div class="feed-copy-button"><button onclick=${async (ev) => {
                    const target = ev.target
                    const value = document.getElementById(`rss-feed-url-${item.purchase_id}`).value
                    try {
                      await navigator.clipboard.writeText(value)
                      target.innerText = 'Copied'
                      console.log('copied feed to clipboard')
                    } catch (e) {
                      console.error(e)
                    }
                  }}>Copy</button></div>
              </div>
            </li>`
          })
      }`
    )
  } catch (e) {
    console.error(e)
    const productEl = document.querySelector('#products')
    render(productEl, html.for(productEl)`Error: ${e.message}`)
  }
}
