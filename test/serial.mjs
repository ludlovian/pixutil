import { test } from 'uvu'
import * as assert from 'uvu/assert'

import isResolved from '../src/is-resolved.mjs'
import trigger from '../src/trigger.mjs'

import Serial from '../src/serial.mjs'

test('queued execution', async () => {
  const s = new Serial()

  const t1 = trigger()
  const p1 = s.exec(() => t1.then(() => 'foo'))

  const p2 = s.exec(() => 'bar')

  assert.is(await isResolved(p1), false)
  assert.is(await isResolved(p2), false)

  t1.resolve()
  assert.is(await p1, 'foo')
  assert.is(await p2, 'bar')
})

test('execution that rejects', async () => {
  const s = new Serial()
  const err = new Error('oops')

  const t1 = trigger()
  const p1 = s.exec(() => t1.then(() => Promise.reject(err)))

  const p2 = s.exec(() => 'bar')

  assert.is(await isResolved(p1), false)
  assert.is(await isResolved(p2), false)

  t1.resolve()
  await p1.then(assert.unreachable, e => assert.is(e, err))
  assert.is(await p2, 'bar')
})

test.run()
