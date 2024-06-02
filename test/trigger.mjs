import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import trigger from '../src/trigger.mjs'

suite('trigger', async () => {
  test('creation', () => {
    const t = trigger()
    assert.equal(t instanceof Promise, true)
    assert.equal(typeof t.resolve, 'function')
    assert.equal(typeof t.reject, 'function')
  })

  test('resolving', async () => {
    const t = trigger()
    t.resolve(17)

    assert.equal(await t, 17)
  })

  test('rejecting', async () => {
    const t = trigger()
    const err = new Error('oops')
    t.reject(err)

    await t.then(assert.fail, e => assert.equal(e, err))
  })
})
