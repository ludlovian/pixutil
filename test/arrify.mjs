import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import arrify from '../src/arrify.mjs'

suite('arrify', () => {
  test('does not convert if already array', () => {
    const x = ['foo']
    const exp = [...x]
    const act = arrify(x)

    assert.deepEqual(act, exp, 'returns identical array')
    assert.equal(act, x, 'returns original object')
  })

  test('converts to array if needed', () => {
    const x = 'foo'
    const exp = [x]
    const act = arrify(x)

    assert.deepEqual(act, exp, 'Turns into array')
  })
})
