import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import exec from '../src/exec.mjs'

suite('exec', async () => {
  await test('runs okay', async () => {
    const p = exec('ls', ['-l'])
    assert.ok(p instanceof Promise)

    const result = await p
    assert.ok('stdout' in result)
    assert.ok('stderr' in result)
  })

  await test('captures errors', async () => {
    const p = exec('ls', ['--foobar'])

    await p.then(assert.fail, err => assert.ok(err instanceof Error))
  })
})
