# pixutil
A bunch of small simple JS utils to save me rewriting them each time.

Each is available as a separate import, or as a named import from the default package.

## arrify
`arrify(x)`

Puts the thing in an arrya if it isn't already one

## clone

Deep clone of simple JS stuff (primitives, `Array`s, `Object`s & `Date`s)

## equal

Deep equality test of structures including primitives, `Array`s `Object`s  & `Date`s

## exec

A promise version of `child_process.execFile`

## exists

A promise version of `fs.existsSync`

## once
`f = once(g)`

Runs the wrapped function once only, caching the result.

## pipeline
`v = pipeline([x, ]fn1, fn2, ...)`

Composes the functions in left-to-right order.
If an object is supplied, then it applies the composed function instead of returning it.

## sleep

`await`-able delay

## spawn

The same `child_process.spawn` function, but has a `.done` which is promise of success (or failure)

## timeout
`await timeout(p, ms = 5000)`
Wraps a promise in a timeout. Or wraps an async function.

## uniq
`uniq(elem, elem,...)` or `uniq(arr, arr,...)`

Returns a unique set of elements.
