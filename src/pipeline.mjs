export default function pipeline (...fns) {
  const src = typeof fns[0] !== 'function' ? fns.shift() : null
  const composed = obj => fns.reduce((o, fn) => fn(o), obj)
  return src === null ? composed : composed(src)
}
