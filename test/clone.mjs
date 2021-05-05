import { test } from 'uvu'
import * as assert from 'uvu/assert'

import clone from '../src/clone.mjs'

test('clone primitives', () => {
  assert.is(clone(17), 17)
  assert.is(clone('foo'), 'foo')
  assert.is(clone(undefined), undefined)
  assert.is(clone(null), null)
})

test('clone date', () => {
  const d = new Date()
  const c = clone(d)
  assert.is.not(c, d)
  assert.is(+c, +d)
})

test('clone array', () => {
  const a = [1, 'foo', 17.4]
  const b = clone(a)
  assert.is.not(b, a)
  assert.equal(b, a)
})

test('clone object', () => {
  const a = { foo: 'bar', baz: 17, quux: true, fooby: undefined, boofy: null }
  const b = clone(a)
  assert.is.not(b, a)
  assert.equal(b, a)
})

test('clone structured object', () => {
  const a = {
    foo: 'bar',
    subarr: [1, 'bar', 17],
    datum: new Date(),
    subobj: { bar: 'quux' }
  }
  const b = clone(a)
  assert.equal(b, a)
  assert.is.not(b, a)
  assert.is.not(b.subarr, a.subarr)
  assert.is.not(b.datum, a.datum)
  assert.is.not(b.subobj, a.subobj)
})

test.run()
