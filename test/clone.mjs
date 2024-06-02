import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import clone from '../src/clone.mjs'

suite('clone', () => {
  test('clone primitives', () => {
    assert.equal(clone(17), 17)
    assert.equal(clone('foo'), 'foo')
    assert.equal(clone(undefined), undefined)
    assert.equal(clone(null), null)
  })

  test('clone date', () => {
    const d = new Date()
    const c = clone(d)
    assert.notEqual(c, d)
    assert.equal(+c, +d)
  })

  test('clone array', () => {
    const a = [1, 'foo', 17.4]
    const b = clone(a)
    assert.notEqual(b, a)
    assert.deepEqual(b, a)
  })

  test('clone object', () => {
    const a = { foo: 'bar', baz: 17, quux: true, fooby: undefined, boofy: null }
    const b = clone(a)
    assert.notEqual(b, a)
    assert.deepEqual(b, a)
  })

  test('clone structured object', () => {
    const a = {
      foo: 'bar',
      subarr: [1, 'bar', 17],
      datum: new Date(),
      subobj: { bar: 'quux' }
    }
    const b = clone(a)
    assert.deepEqual(b, a)
    assert.notEqual(b, a)
    assert.notEqual(b.subarr, a.subarr)
    assert.notEqual(b.datum, a.datum)
    assert.notEqual(b.subobj, a.subobj)
  })
})
