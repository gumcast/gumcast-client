const tape = require('tape')
const ptape = require('tape-promise').default
const test = ptape(tape)

test('a test', async t => {
  t.ok('pass')
})
