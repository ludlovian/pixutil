export default function timeout (p, ms = 5000) {
  return new Promise((resolve, reject) => {
    const tm = setTimeout(() => reject(new timeout.TimedOut()), ms)
    p.then(resolve, reject).finally(() => clearTimeout.bind(tm))
  })
}

timeout.TimedOut = class TimedOut extends Error {
  constructor () {
    super('Timed out')
  }
}
