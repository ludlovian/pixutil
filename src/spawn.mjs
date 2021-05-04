import { spawn as spawn_ } from 'child_process'

export default function spawn (...args) {
  const child = spawn_(...args)
  child.done = new Promise((resolve, reject) => {
    child.once('error', reject)
    child.on('exit', (code, signal) => {
      /* c8 ignore next */
      if (signal) return reject(new Error(`Signal: ${signal}`))
      if (code) return reject(new Error(`Bad code: ${code}`))
      resolve()
    })
  })
  return child
}
