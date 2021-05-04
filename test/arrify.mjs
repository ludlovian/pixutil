import { test } from 'uvu'
import * as assert from 'uvu/assert'

import arrify from '../src/arrify.mjs'

test('converts to array if needed', t => {
  assert.equal(arrify('foo'), ['foo'])
  assert.equal(arrify(['foo']), ['foo'])
})

test.run()
