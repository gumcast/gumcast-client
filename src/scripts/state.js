import lsp from 'local-storage-proxy'

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
