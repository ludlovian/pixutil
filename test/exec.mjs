import { test } from 'uvu'
import * as assert from 'uvu/assert'

import exec from '../src/exec.mjs'

test('runs okay', async () => {
  const p = exec('ls', ['-l'])
  assert.instance(p, Promise)

  const result = await p
  assert.ok('stdout' in result)
  assert.ok('stderr' in result)
})

test('captures errors', async () => {
  const p = exec('ls', ['--foobar'])

  await p.then(assert.unreachable, err => assert.instance(err, Error))
})

test.run()
