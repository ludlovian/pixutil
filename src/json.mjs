const $DATE = '$date$'
const $UNDEFINED = '$undefined$'

export function serialize (x) {
  if (Array.isArray(x)) return x.map(serialize)
  if (x === undefined) return { [$UNDEFINED]: true }
  if (x instanceof Date) return { [$DATE]: x.toISOString() }
  if (x === null || typeof x !== 'object') return x
  return Object.fromEntries(
    Object.entries(x).map(([k, v]) => [k, serialize(v)])
  )
}

export function deserialize (x) {
  if (Array.isArray(x)) return x.map(deserialize)
  if (x === null || typeof x !== 'object') return x
  if ($DATE in x) return new Date(x[$DATE])
  if ($UNDEFINED in x) return undefined
  return Object.fromEntries(
    Object.entries(x).map(([k, v]) => [k, deserialize(v)])
  )
}
