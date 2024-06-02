import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import pipeline from '../src/pipeline.mjs'

suite('pipeline', () => {
  const addOne = x => x + 1
  const timesTwo = x => x * 2
  const negate = x => -x

  test('apply in order without arg', () => {
    let r
    r = pipeline(timesTwo, addOne, negate)(3)
    assert.equal(r, -7)

    r = pipeline(negate, addOne, timesTwo)(3)
    assert.equal(r, -4)
  })

  test('apply in order with arg', () => {
    let r
    r = pipeline(3, timesTwo, addOne, negate)
    assert.equal(r, -7)

    r = pipeline(3, negate, addOne, timesTwo)
    assert.equal(r, -4)
  })
})
