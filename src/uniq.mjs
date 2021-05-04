export default function uniq (...values) {
  return [...new Set([].concat(...values))]
}
