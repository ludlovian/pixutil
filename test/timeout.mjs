import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import timeout from '../src/timeout.mjs'

suite('timeout', async () => {
  test('copes with promise that fulfils', async () => {
    const prom = Promise.resolve().then(() => 17)
    const start = Date.now()
    const res = await timeout(prom, 500)
    const end = Date.now()

    assert.equal(res, 17)
    assert.ok(end - start < 100)
  })

  test('copes with promise that rejects', async () => {
    const err = new Error('oops')
    const prom = Promise.resolve().then(() => Promise.reject(err))
    const start = Date.now()
    await timeout(prom, 500)
      .then(assert.fail)
      .catch(e => assert.equal(e, err))
    const end = Date.now()

    assert.ok(end - start < 100)
  })

  test('times out a promise', async () => {
    const p = new Promise(() => {})
    const start = Date.now()
    await timeout(p, 150)
      .then(assert.fail)
      .catch(e => assert.ok(e instanceof timeout.TimedOut))
    const end = Date.now()

    assert.ok(end - start > 120)
  })

  test('wraps a succesful function', async () => {
    const f = async (x, y) => x + y
    const f2 = timeout(f, 500)
    assert.equal(typeof f2, 'function')
    const start = Date.now()
    const res = await f2(8, 9)
    const end = Date.now()

    assert.equal(res, 17)
    assert.ok(end - start < 100)
  })

  test('wraps a throwing function', async () => {
    const err = new Error('oops')
    const f = () => {
      throw err
    }
    const f2 = timeout(f, 500)
    assert.equal(typeof f2, 'function')

    const start = Date.now()
    await f2()
      .then(assert.fail)
      .catch(e => assert.equal(e, err))
    const end = Date.now()

    assert.ok(end - start < 100)
  })

  test('wraps a hanging function', async () => {
    const f = () => new Promise(() => {})
    const f2 = timeout(f, 150)
    const start = Date.now()
    await f2()
      .then(assert.fail)
      .catch(e => assert.ok(e instanceof timeout.TimedOut))
    const end = Date.now()

    assert.ok(end - start > 120)
  })
})
