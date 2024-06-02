# pixutil
A bunch of small simple JS utils to save me rewriting them each time.

Each is available as a separate import, or as a named import from the default package.

## arrify
`arrify(x)`

Puts the thing in an array if it isn't already one

## camelCase
`camelCase(str)`

Converts a variable name into camelCase.

## clone

Deep clone of simple JS stuff (primitives, `Array`s, `Object`s & `Date`s)

## equal

Deep equality test of structures including primitives, `Array`s `Object`s  & `Date`s

## exec

A promise version of `child_process.execFile`

## exists

A promise version of `fs.existsSync`

## isResolved
`if await (isResolved(p, ms = 20)) ...`

Returns true/false if the promise has been resolved or not.

## json

Serialize/deserialize objs to json, including dates and undefined

Provides `{ serialize, deserialize }` from the separate import

Also provides `json = { serialize, deserialize }` from the main package

## once
`f = once(g)`

Runs the wrapped function once only, caching the result.

## pipeline
`v = pipeline([x, ]fn1, fn2, ...)`

Composes the functions in left-to-right order.
If an object is supplied, then it applies the composed function instead of returning it.

## serial
```
const s = serial()
await s.exec(fn)
```

Creates a serialiser which will only `exec` functions one at a time.

## sleep

`await`-able delay

## spawn

The same `child_process.spawn` function, but has a `.done` which is promise of success (or failure)

## timeout
`await timeout(p, ms = 5000)`
Wraps a promise in a timeout. Or wraps an async function.

## trigger

Returns a pending promise which has `.resolve` and `.reject` props.

## uniq
`uniq(elem, elem,...)` or `uniq(arr, arr,...)`

Returns a unique set of elements.
