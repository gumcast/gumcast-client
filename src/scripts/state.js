import lsp from 'local-storage-proxy'

export const state = lsp('gumcast', {
  defaults: {
    tokens: {},
    currentUser: null,
    apiUrl: 'https://api.gumcast.com',
    proxyFiles: 'redirect'
  },
  lspReset: 1
})

window.state = state
