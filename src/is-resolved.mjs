export default function isResolved (p, ms = 20) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(false), ms)
    p.then(() => resolve(true), reject)
  })
}
