export default function arrify (x) {
  return Array.isArray(x) ? x : [x]
}
