import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import exists from '../src/exists.mjs'

suite('exists', async () => {
  test('runs okay', async () => {
    assert.equal(await exists('test/exists.mjs'), true)
    assert.equal(await exists('test/foo.bar'), false)
  })

  test('captures errors', async () => {
    await exists({}).then(assert.fail, err => assert.ok(err instanceof Error))
  })
})
