import { state } from './login-state.js'

export function route () {
  if (state.currentUser === null && window.location.pathname !== '/login/') {
    window.location.replace('/login/')
  } else if (state.currentUser != null && ['/', '/login/'].some(p => window.location.pathname === p)) {
    window.location.replace('/products/')
  }
}
