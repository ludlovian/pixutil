export default function clone (o) {
  if (!o || typeof o !== 'object') return o
  if (o instanceof Date) return new Date(o)
  if (Array.isArray(o)) return o.map(clone)
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, clone(v)]))
}
