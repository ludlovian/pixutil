import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import equal from '../src/equal.mjs'
import { serialize, deserialize } from '../src/json.mjs'

suite('json', () => {
  test('serialize', () => {
    const d = new Date()
    const from = {
      arr: [1, 2, undefined, 4],
      obj: {
        when: d,
        maybe: true,
        ifnot: null,
        and: 'only if',
        any: 1,
        really: ['cares']
      }
    }

    const to = serialize(from)

    const exp = {
      arr: [1, 2, { $undefined$: true }, 4],
      obj: {
        when: { $date$: d.toISOString() },
        maybe: true,
        ifnot: null,
        and: 'only if',
        any: 1,
        really: ['cares']
      }
    }

    assert.ok(equal(to, exp))
  })

  test('serialize', () => {
    const d = new Date()
    const from = {
      arr: [1, 2, { $undefined$: true }, 4],
      obj: {
        when: { $date$: d.toISOString() },
        maybe: true,
        ifnot: null,
        and: 'only if',
        any: 1,
        really: ['cares']
      }
    }

    const to = deserialize(from)

    const exp = {
      arr: [1, 2, undefined, 4],
      obj: {
        when: d,
        maybe: true,
        ifnot: null,
        and: 'only if',
        any: 1,
        really: ['cares']
      }
    }

    assert.ok(equal(to, exp))
  })
})
