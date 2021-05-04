import { stat } from 'fs/promises'

export default async function exists (file) {
  try {
    await stat(file)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    throw err
  }
}
