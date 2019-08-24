const Component = require('hui')
const html = require('hui/html')
const css = require('csjs')

const opts = Object.assign({
  apiUrl: 'https://gumcast.com/api/'
}, {
  apiUrl: process.env.GUMCAST_API_URL
})

const styles = css`
  .app-container: {}
`

class App extends Component {
  constructor ({ apiUrl } = {}) {
    super()

    this._apiUrl = apiUrl

    this._view = this._loginView().element
    this._targetView = null
  }

  createElement () {
    return html`<div>
      ${this._view}
    </div>`
  }
}

const app = new App(opts)

document.querySelector('#app-container').appendChild(app.element)
