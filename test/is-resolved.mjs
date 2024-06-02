import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import isResolved from '../src/is-resolved.mjs'
import sleep from '../src/sleep.mjs'

suite('isResolved', async () => {
  test('on pending promise', async () => {
    const p = sleep(50)
    assert.equal(await isResolved(p), false)
    await p
  })

  test('on resolved promise', async () => {
    const p = Promise.resolve()
    assert.equal(await isResolved(p), true)
  })

  test('with custom time', async () => {
    const p = sleep(20)
    assert.equal(await isResolved(p, 30), true)
  })

  test('on rejected', async () => {
    const e = new Error()
    const p = Promise.reject(e)
    await isResolved(p)
      .then(assert.fail)
      .catch(err => assert.equal(err, e))
  })
})
