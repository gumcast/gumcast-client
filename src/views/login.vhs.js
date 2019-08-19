const vhs = require('vhs-tape')
const Login = require('./login')

vhs('login component mounts', async t => {
  const login = new Login({
    onlogin (tokenBundle) {
      t.pass(tokenBundle, 'got a tokenBundle')
    }
  })
  console.log(login.element)
  await t.appendChild(login.element)
})
