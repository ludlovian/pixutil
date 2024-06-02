import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import isResolved from '../src/is-resolved.mjs'
import trigger from '../src/trigger.mjs'

import Serial from '../src/serial.mjs'

suite('serial', async () => {
  test('queued execution', async () => {
    const s = new Serial()

    const t1 = trigger()
    const p1 = s.exec(() => t1.then(() => 'foo'))

    const p2 = s.exec(() => 'bar')

    assert.equal(await isResolved(p1), false)
    assert.equal(await isResolved(p2), false)

    t1.resolve()
    assert.equal(await p1, 'foo')
    assert.equal(await p2, 'bar')
  })

  test('execution that rejects', async () => {
    const s = new Serial()
    const err = new Error('oops')

    const t1 = trigger()
    const p1 = s.exec(() => t1.then(() => Promise.reject(err)))

    const p2 = s.exec(() => 'bar')

    assert.equal(await isResolved(p1), false)
    assert.equal(await isResolved(p2), false)

    t1.resolve()
    await p1.then(assert.fail, e => assert.equal(e, err))
    assert.equal(await p2, 'bar')
  })
})
