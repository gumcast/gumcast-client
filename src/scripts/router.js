import { state } from './state.js'

export function route () {
  if (state.currentUser === null && window.location.pathname !== '/') {
    window.location.replace('/')
  } else if (state.currentUser != null && ['/'].some(p => window.location.pathname === p)) {
    window.location.replace('/library/')
  }
}
