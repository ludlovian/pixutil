import { test } from 'uvu'
import * as assert from 'uvu/assert'

import uniq from '../src/uniq.mjs'

test('uniq values in an array', t => {
  const res = uniq(['foo', 'bar', 'bar', 'baz', 'foo', 'quux'])

  assert.equal(res.sort(), ['bar', 'baz', 'foo', 'quux'])
})

test('uniq values in multiple params', t => {
  const res = uniq('foo', 'bar', 'bar', 'baz', 'foo', 'quux')

  assert.equal(res.sort(), ['bar', 'baz', 'foo', 'quux'])
})

test('empty call', t => {
  const res = uniq()

  assert.equal(res, [])
})

test.run()
