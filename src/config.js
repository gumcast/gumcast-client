const opts = Object.assign({
  apiUrl: 'https://gumcast.com/api/'
}, {
  apiUrl: process.env.GUMCAST_API_URL
})

module.exports = opts
