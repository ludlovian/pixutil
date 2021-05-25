export default function Serial () {
  let gate = Promise.resolve()
  return {
    exec (fn) {
      const result = gate.then(() => fn())
      gate = result.then(NOOP, NOOP)
      return result
    }
  }
}

function NOOP () {}
