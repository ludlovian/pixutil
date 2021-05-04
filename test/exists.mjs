import { test } from 'uvu'
import * as assert from 'uvu/assert'

import exists from '../src/exists.mjs'

test('runs okay', async () => {
  assert.is(await exists('test/exists.mjs'), true)
  assert.is(await exists('test/foo.bar'), false)
})

test('captures errors', async () => {
  await exists({}).then(assert.unreachable, err => assert.instance(err, Error))
})

test.run()
