import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import isResolved from '../src/is-resolved.mjs'
import trigger from '../src/trigger.mjs'

import Serial from '../src/serial.mjs'

suite('serial', async () => {
  await test('construction', () => {
    const s = Serial()
    assert.equal(typeof s.exec, 'function', 's.exec is a function')
    assert.equal(typeof s, 'function', 'returns a function')
  })

  await test('queued execution', async () => {
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

  await test('nested execution', async () => {
    const serial = new Serial()
    const array = []
    const t11 = trigger()
    const t12 = trigger()

    const p1 = serial(async () => {
      array.push(1)
      const p11 = serial(async () => {
        await t11
        array.push(11)
      })
      const p12 = serial(async () => {
        await t12
        array.push(12)
      })
      await Promise.all([p11, p12])
    })
    const p2 = serial(() => array.push(2))

    assert.equal(await isResolved(p1), false, '1. Nothing resolved')
    assert.deepEqual(array, [1], 'Got to point 1')

    t12.resolve()
    assert.equal(await isResolved(p1), false, '2. Still not resolved')
    t11.resolve()

    assert.equal(await isResolved(p1), true, '3. #1 is now resolved')
    assert.equal(await isResolved(p2), true, '4. #2 is now resolved')

    assert.deepEqual(array, [1, 11, 12, 2], 'Done in right order')
  })

  await test('execution that rejects', async () => {
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
