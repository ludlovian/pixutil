export default function Trigger () {
  const fns = {}
  return Object.assign(
    new Promise((resolve, reject) => Object.assign(fns, { resolve, reject })),
    fns
  )
}
