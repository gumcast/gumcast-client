import { route } from '/scripts/router.js'
import { state } from '/scripts/login-state.js'
const fetch = window.fetch

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
    return populateProducts()
  }
}

async function populateProducts () {
  const productEl = document.querySelector('.products')

  const tokenBundle = state.tokens[state.currentUser]

  const params = new URLSearchParams({
    access_token: tokenBundle.access_token,
    refresh_token: tokenBundle.refresh_token
  })

  try {
    const res = await fetch(`https://gumcast.com/api/products?${params.toString()}`, {
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

    productEl.innerText = JSON.stringify(body, null, '  ')
  } catch (e) {
    console.error(e)
  }
}
