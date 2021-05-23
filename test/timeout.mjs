import { test } from 'uvu'
import * as assert from 'uvu/assert'

import timeout from '../src/timeout.mjs'

test('copes with promise that fulfils', async () => {
  const prom = Promise.resolve().then(() => 17)
  const start = Date.now()
  const res = await timeout(prom, 500)
  const end = Date.now()

  assert.is(res, 17)
  assert.ok(end - start < 100)
})

test('copes with promise that rejects', async () => {
  const err = new Error('oops')
  const prom = Promise.resolve().then(() => Promise.reject(err))
  const start = Date.now()
  await timeout(prom, 500)
    .then(assert.unreachable)
    .catch(e => assert.is(e, err))
  const end = Date.now()

  assert.ok(end - start < 100)
})

test('times out a promise', async () => {
  const p = new Promise(() => {})
  const start = Date.now()
  await timeout(p, 150)
    .then(assert.unreachable)
    .catch(e => assert.ok(e instanceof timeout.TimedOut))
  const end = Date.now()

  assert.ok(end - start > 120)
})

test.run()
