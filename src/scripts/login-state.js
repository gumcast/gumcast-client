import { localStorageProxy } from './lsp.js'

export const state = localStorageProxy('gumcast', {
  defaults: {
    tokens: {},
    currentUser: null
  }
})
