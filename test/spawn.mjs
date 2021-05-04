import { test } from 'uvu'
import * as assert from 'uvu/assert'

import spawn from '../src/spawn.mjs'

test('runs okay', async () => {
  const proc = spawn('ls', ['-l'])
  let received
  proc.stdout.on('data', () => (received = true))
  assert.instance(proc.done, Promise)

  await proc.done
  assert.ok(received)
})

test('captures errors', async () => {
  const proc = spawn('ls', ['--foobar'], { stdio: 'ignore' })
  await proc.done.then(assert.unreachable, err => assert.instance(err, Error))
})

test.run()
