// createSerial
//
// Reentrant serial gate. Serialises execution by chaining promises.
// When called, a new chain is created allowing nested calls
// The original chain is restored at the end of each call

export default function createSerial () {
  let gate = Promise.resolve()
  exec.exec = exec
  return exec

  function exec (fn) {
    let prevGate

    const result = gate.then(saveGate).then(fn)
    gate = result.then(restoreGate, restoreGate)

    return result

    function saveGate () {
      prevGate = gate
      gate = Promise.resolve()
    }

    function restoreGate () {
      gate = prevGate
    }
  }
}
