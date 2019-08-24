const vhs = require('vhs-tape')
const Login = require('./login')

vhs('login component mounts', async t => {
  const login = new Login({
    onlogin (tokenBundle) {
      t.ok(tokenBundle, 'got a tokenBundle')
    }
  })
  console.log(login.element)
  await t.appendChild(login.element)

  await t.typeValue('#username', 'mr. guy')
  await t.typeValue('#password', '1234qwer')
  await t.click('button[type="submit"]')
})
