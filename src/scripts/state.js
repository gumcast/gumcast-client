import { localStorageProxy } from './lsp.js'

export const state = localStorageProxy('gumcast', {
  defaults: {
    tokens: {},
    currentUser: null,
    apiUrl: 'https://api.gumcast.com',
    proxyFiles: 'redirect'
  }
})

window.state = state
