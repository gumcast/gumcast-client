import { route } from './scripts/router.js'
import { state } from './scripts/state.js'

import { fetch } from 'fetch-undici'

route()

const loginForm = document.querySelector('#login-form')
const errorBox = document.querySelector('.error-box')

loginForm.addEventListener('submit', async (ev) => {
  ev.preventDefault()

  const el = loginForm
  const fieldSet = el.querySelector('fieldset')
  fieldSet.disabled = true

  const passwordBundle = {
    password: el.password.value.trim(),
    username: el.username.value.trim()
  }

  try {
    const res = await fetch(`${state.apiUrl}/login`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(passwordBundle),
      mode: 'cors'
    })

    if (res.status !== 200) {
      const err = new Error('Response status !== 200')
      err.res = res
      throw err
    }

    const body = await res.json()

    state.tokens[passwordBundle.username] = body
    state.currentUser = passwordBundle.username
    route()
  } catch (e) {
    console.error(e)
    fieldSet.disabled = false
    if (e.res.status === 401) {
      errorBox.innerText = '401: Incorrect credentials'
    } else {
      const body = await e.res.json()
      errorBox.innerText = `${e.res.status}: ${body.error_description || body.error || e.message}`
    }
  }
})
