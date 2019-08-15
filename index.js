const Component = require('hui')
const html = require('hui/html')

const opts = Object.assign({
  apiUrl: 'https://gumcast.com/api/'
}, {
  apiUrl: process.env.GUMCAST_API_URL
})

class App extends Component {
  constructor ({ apiUrl } = {}) {
    super()

    this._apiUrl = apiUrl

    this._view =
    this._targetView = null
  }

  createElement () {
    return html`<div>
      Hey whats poppin
    </div>`
  }
}

const app = new App(opts)

document.querySelector('#app-container').appendChild(app.element)
