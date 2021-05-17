import { test } from 'uvu'
import * as assert from 'uvu/assert'

import pipeline from '../src/pipeline.mjs'

const addOne = x => x + 1
const timesTwo = x => x * 2
const negate = x => -x

test('apply in order without arg', () => {
  let r
  r = pipeline(timesTwo, addOne, negate)(3)
  assert.is(r, -7)

  r = pipeline(negate, addOne, timesTwo)(3)
  assert.is(r, -4)
})

test('apply in order with arg', () => {
  let r
  r = pipeline(3, timesTwo, addOne, negate)
  assert.is(r, -7)

  r = pipeline(3, negate, addOne, timesTwo)
  assert.is(r, -4)
})

test.run()
