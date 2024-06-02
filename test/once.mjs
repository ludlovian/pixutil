import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import once from '../src/once.mjs'

suite('once', () => {
  function foo (x) {
    return x * 10
  }
  test('construction', t => {
    const fn = t.mock.fn(foo)
    const wrapped = once(fn)
    assert.equal(typeof wrapped, 'function')
    assert.equal(wrapped.name, foo.name)
  })

  test('calls once', t => {
    const fn = t.mock.fn(foo)
    const wrapped = once(fn)

    assert.equal(wrapped(2), 20)
    assert.equal(fn.mock.callCount(), 1)

    assert.equal(wrapped(3), 20)
    assert.equal(fn.mock.callCount(), 1)

    assert.ok(wrapped.called)
  })
})
