import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import spawn from '../src/spawn.mjs'

suite('spawn', async () => {
  test('runs okay', async t => {
    const called = t.mock.fn()

    const proc = spawn('ls', ['-l'])
    proc.stdout.on('data', called)

    assert.ok(proc.done instanceof Promise)

    await proc.done
    assert.ok(called.mock.callCount() > 0)
  })

  test('captures errors', async () => {
    const proc = spawn('ls', ['--foobar'], { stdio: 'ignore' })
    await proc.done.then(assert.fail, err => assert.ok(err instanceof Error))
  })
})
