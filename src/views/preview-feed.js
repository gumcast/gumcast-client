const Component = require('hui')
const html = require('hui/html')
const css = require('csjs2')
const assert = require('nanoassert')

const styles = css`
  .green {
    color: green;
  }
`

module.exports = class PreviewFeed extends Component {
  constructor ({ } = {}) {
    super()
    this.foo = 'foo'
  }

  createElement () {
    return html`
        <div>
          Show a preview of the feed
        </div>`
  }
}
