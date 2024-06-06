import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import camelCase from '../src/camel-case.mjs'

suite('camelCase', () => {
  const tests = [
    ['', '', 'empty string'],
    ['foo', 'foo', 'single LC word'],
    ['FOO', 'foo', 'single UC word'],
    ['foo bar', 'fooBar', 'spaced LC words'],
    ['FOO BAR', 'fooBar', 'spaced UC words'],
    ['foo-bar', 'fooBar', 'hyphened LC words'],
    ['FOO-BAR', 'fooBar', 'hyphened UC words'],
    ['foo_bar', 'fooBar', 'underscored LC words'],
    ['FOO_BAR', 'fooBar', 'underscored UC words'],
    ['FooBar', 'fooBar', 'Pascal case'],
    ['fooBar', 'fooBar', 'already in camel case'],
    ['Foo2Bar3', 'foo2Bar3', 'numbers in UC words'],
    ['foo2bar3', 'foo2Bar3', 'numbers in LC words'],
    ['ABFoo', 'abFoo', 'Initialism']
  ]

  for (const [str, exp, msg] of tests) {
    test(msg, () => {
      assert.equal(camelCase(str), exp)
    })
  }
})
