import { test } from 'uvu'
import * as assert from 'uvu/assert'

import trigger from '../src/trigger.mjs'

test('creation', () => {
  const t = trigger()
  assert.is(t instanceof Promise, true)
  assert.type(t.resolve, 'function')
  assert.type(t.reject, 'function')
})

test('resolving', async () => {
  const t = trigger()
  t.resolve(17)

  assert.is(await t, 17)
})

test('rejecting', async () => {
  const t = trigger()
  const err = new Error('oops')
  t.reject(err)

  await t.then(assert.unreachable, e => assert.is(e, err))
})

test.run()
