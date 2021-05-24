import { test } from 'uvu'
import * as assert from 'uvu/assert'

import isResolved from '../src/is-resolved.mjs'
import sleep from '../src/sleep.mjs'

test('on pending promise', async () => {
  const p = sleep(50)
  assert.is(await isResolved(p), false)
  await p
})

test('on resolved promise', async () => {
  const p = Promise.resolve()
  assert.is(await isResolved(p), true)
})

test('with custom time', async () => {
  const p = sleep(20)
  assert.is(await isResolved(p, 30), true)
})

test('on rejected', async () => {
  const e = new Error()
  const p = Promise.reject(e)
  await isResolved(p)
    .then(assert.unreachable)
    .catch(err => assert.is(err, e))
})

test.run()
