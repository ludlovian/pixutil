import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import guess from '../src/guess.mjs'

suite('guess', () => {
  const hint = {
    date: true,
    bool: true,
    xml: xml => ({ xml }),
    decimall: decimal => ({ decimal })
  }

  test('undefined and null', () => {
    let v

    v = undefined
    assert.equal(guess(v), v, 'undefined returned')
    assert.equal(guess(v, hint), v, 'undefined returned with hints')

    v = null
    assert.equal(guess(v), v, 'undefined returned')
    assert.equal(guess(v, hint), v, 'undefined returned with hints')
  })

  test('objects', () => {
    const v = { someObject: true }
    assert.equal(guess(v), v, 'object returned')
    assert.equal(guess(v, hint), v, 'object returned with hints')
  })

  test('numbers', () => {
    assert.equal(guess('17'), 17, 'integers converted')
    assert.equal(guess('1.234'), 1.234, 'rationals converted')
  })

  test('bools', () => {
    const hint = { bool: true }
    assert.equal(guess('true'), true, 'literal true')
    assert.equal(guess('false'), false, 'literal false')
    assert.equal(guess('1', hint), true, 'truthy number')
    assert.equal(guess('0', hint), false, 'falsy number')
    assert.equal(guess('t-ish', hint), true, 't-string')
    assert.equal(guess('T-ish', hint), true, 'T-string')
    assert.equal(guess('f-ish', hint), false, 't-string')
    assert.equal(guess('F-ish', hint), false, 'F-string')
    assert.equal(guess('other', hint), 'other', 'passed thru')
  })

  test('dates', () => {
    const v = '2014-05-06T17:18:19.789Z'
    const v2 = v + 'X'
    const d = new Date(v)

    const hint = { date: true }

    assert.equal(guess(v), v, 'Pass thru with no hint')
    assert.ok(guess(v, hint) instanceof Date, 'returns a date')
    assert.equal(+guess(v, hint), +d, 'returns the right date')
    assert.equal(guess(v2, hint), v2, 'non date pass thru')
  })

  test('decimals', () => {
    const hint = { decimal: decimal => ({ decimal }) }

    const v = '1.2345'
    const v2 = '1.2345X'
    const exp = { decimal: v }

    assert.equal(guess(v), 1.2345, 'Pass thru with no hint')
    assert.deepEqual(guess(v, hint), exp, 'converts decimal')
    assert.equal(guess(v2, hint), v2, 'pass trhu if not decimal')
  })

  test('xml', () => {
    const hint = { xml: xml => ({ xml }) }

    const v = '<blah />'
    const v2 = v + 'X'
    const exp = { xml: v }

    assert.equal(guess(v), v, 'Pass thru with no hint')
    assert.deepEqual(guess(v, hint), exp, 'converts xml')
    assert.equal(guess(v2, hint), v2, 'pass trhu if not xml')
  })

  test('other types', () => {
    const v = Symbol('blah')

    assert.equal(guess(v), v, 'passthru no hint')
    assert.equal(guess(v, hint), v, 'passthru with hint')
  })
})
