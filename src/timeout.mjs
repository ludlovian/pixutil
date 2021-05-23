export default function timeout (p, ms = 5000) {
  if (typeof p === 'function') return async (...args) => timeout(p(...args), ms)
  return new Promise((resolve, reject) => {
    const tm = setTimeout(() => reject(new timeout.TimedOut()), ms)
    p.then(resolve, reject).finally(() => clearTimeout(tm))
  })
}

timeout.TimedOut = class TimedOut extends Error {
  constructor () {
    super('Timed out')
  }
}
