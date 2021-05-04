import { test } from 'uvu'
import * as assert from 'uvu/assert'

import sleep from '../src/sleep.mjs'

test('sleeps', async () => {
  const start = Date.now()
  await sleep(100)
  const end = Date.now()

  assert.ok(Math.abs(end - start - 100) < 5)
})

test.run()
