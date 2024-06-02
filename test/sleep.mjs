import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import sleep from '../src/sleep.mjs'

suite('sleep', async () => {
  test('sleeps', async () => {
    const start = Date.now()
    await sleep(100)
    const end = Date.now()

    assert.ok(Math.abs(end - start - 100) < 5)
  })
})
