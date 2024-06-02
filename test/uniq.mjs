import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import uniq from '../src/uniq.mjs'

suite('uniq', () => {
  test('uniq values in an array', t => {
    const res = uniq(['foo', 'bar', 'bar', 'baz', 'foo', 'quux'])

    assert.deepEqual(res.sort(), ['bar', 'baz', 'foo', 'quux'])
  })

  test('uniq values in multiple params', t => {
    const res = uniq('foo', 'bar', 'bar', 'baz', 'foo', 'quux')

    assert.deepEqual(res.sort(), ['bar', 'baz', 'foo', 'quux'])
  })

  test('empty call', t => {
    const res = uniq()

    assert.deepEqual(res, [])
  })
})
