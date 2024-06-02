import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import equal from '../src/equal.mjs'

suite('equal', () => {
  test('compare primitives', () => {
    assert.ok(equal(17, 17))
    assert.ok(!equal(17, 18))

    assert.ok(equal('foo', 'foo'))
    assert.ok(!equal('foo', 'bar'))

    assert.ok(equal(undefined, undefined))
    assert.ok(equal(null, null))
    assert.ok(!equal(null, undefined))
  })

  test('compare dates', () => {
    const a = new Date()
    let b = new Date(a)

    assert.deepEqual(a, b)
    assert.ok(equal(a, b))
    assert.ok(equal(b, a))

    b = new Date(+a + 1)

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))
  })

  test('compare array', () => {
    const a = [1, 'foo', 17.4]
    let b = [...a]

    assert.deepEqual(a, b)
    assert.ok(equal(a, b))
    assert.ok(equal(b, a))

    b[1] = 'bar'

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))

    b = [...a].concat(undefined)

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))
  })

  test('compare object', () => {
    const a = { foo: 'bar', baz: 17, quux: true, fooby: undefined, boofy: null }
    let b = { ...a }

    assert.ok(equal(a, b))
    assert.ok(equal(b, a))

    b = { ...a, foo: 'baz' }

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))

    b = { ...a, extra: undefined }

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))

    b = { ...a }
    delete b.quux

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))
  })

  test('compare class with object', () => {
    class Foo {}
    const a = Object.assign(new Foo(), { bar: 'baz' })
    const b = { ...a }

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))

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

    assert.deepEqual(a, b)
    assert.ok(equal(a, b))
    assert.ok(equal(b, a))

    b.arr[1].baz = undefined

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))

    b.arr = a.arr

    assert.deepEqual(a, b)
    assert.ok(equal(a, b))
    assert.ok(equal(b, a))

    b.obj.quux = undefined

    assert.ok(!equal(a, b))
    assert.ok(!equal(b, a))
  })
})
