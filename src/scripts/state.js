import lsp from 'https://unpkg.com/local-storage-proxy@^2?module'

export const state = lsp('gumcast', {
  defaults: {
    tokens: {},
    currentUser: null,
    apiUrl: 'https://api.gumcast.com',
    proxyFiles: 'redirect'
  }
})

window.state = state
