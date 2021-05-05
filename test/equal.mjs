import { test } from 'uvu'
import * as assert from 'uvu/assert'

import equal from '../src/equal.mjs'

test('compare primitives', () => {
  assert.ok(equal(17, 17))
  assert.not.ok(equal(17, 18))

  assert.ok(equal('foo', 'foo'))
  assert.not.ok(equal('foo', 'bar'))

  assert.ok(equal(undefined, undefined))
  assert.ok(equal(null, null))
  assert.not.ok(equal(null, undefined))
})

test('compare dates', () => {
  const a = new Date()
  let b = new Date(a)

  assert.equal(a, b)
  assert.ok(equal(a, b))
  assert.ok(equal(b, a))

  b = new Date(+a + 1)

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))
})

test('compare array', () => {
  const a = [1, 'foo', 17.4]
  let b = [...a]

  assert.equal(a, b)
  assert.ok(equal(a, b))
  assert.ok(equal(b, a))

  b[1] = 'bar'

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))

  b = [...a].concat(undefined)

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))
})

test('compare object', () => {
  const a = { foo: 'bar', baz: 17, quux: true, fooby: undefined, boofy: null }
  let b = { ...a }

  assert.ok(equal(a, b))
  assert.ok(equal(b, a))

  b = { ...a, foo: 'baz' }

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))

  b = { ...a, extra: undefined }

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))

  b = { ...a }
  delete b.quux

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))
})

test('compare class with object', () => {
  class Foo {}
  const a = Object.assign(new Foo(), { bar: 'baz' })
  const b = { ...a }

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))

  assert.ok(equal({ ...a }, b))
  assert.ok(equal(b, { ...a }))
})

test('compare structured object', () => {
  const a = {
    foo: 'bar',
    arr: [1, { name: 'bar' }, 17],
    dt: new Date(),
    obj: { bar: 'quux' }
  }
  const b = {
    foo: 'bar',
    arr: [1, { name: 'bar' }, 17],
    dt: new Date(),
    obj: { bar: 'quux' }
  }

  assert.equal(a, b)
  assert.ok(equal(a, b))
  assert.ok(equal(b, a))

  b.arr[1].baz = undefined

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))

  b.arr = a.arr

  assert.equal(a, b)
  assert.ok(equal(a, b))
  assert.ok(equal(b, a))

  b.obj.quux = undefined

  assert.not.ok(equal(a, b))
  assert.not.ok(equal(b, a))
})

test.run()
