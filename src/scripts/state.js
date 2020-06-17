import lsp from 'https://unpkg.com/local-storage-proxy@^3?module'

export const state = lsp('gumcast', {
  defaults: {
    tokens: {},
    currentUser: null,
    apiUrl: 'https://gumcast-api.herokuapp.com',
    proxyFiles: 'redirect'
  },
  lspReset: false
})

window.state = state
