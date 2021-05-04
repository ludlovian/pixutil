import { test } from 'uvu'
import * as assert from 'uvu/assert'

import once from '../src/once.mjs'

test('construction', t => {
  const fn = once(foo)
  assert.type(fn, 'function')
  assert.is(fn.name, 'foo')
})

test('calls once', t => {
  const fn = once(foo)
  assert.type(fn, 'function')
  assert.is(fn.name, 'foo')

  calls = 0
  assert.is(fn(2), 20)
  assert.is(calls, 1)

  assert.is(fn(3), 20)
  assert.is(calls, 1)
  assert.ok(fn.called)
})

let calls

function foo (x) {
  calls++
  return x * 10
}

test.run()
