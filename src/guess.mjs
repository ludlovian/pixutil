const rgxBool = /^[TtFf]/
const rgxDate = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d(?:.\d+)?Z?$/
const rgxDecimal = /^-?\d+(?:\.\d+)?(?:e([+-]\d+))?$/
const rgxXML = /^<.*>$/

export default function guess (val, hint = {}) {
  if (val == null) return val
  const typ = typeof val
  if (typ !== 'string') return val

  const { bool, decimal, xml, date } = hint
  if (val === 'true') return true
  if (val === 'false') return false
  if (date && rgxDate.test(val)) return new Date(val)
  if (bool && rgxBool.test(val)) return val.charAt(0).toLowerCase() === 't'
  if (decimal && rgxDecimal.test(val)) return decimal(val)
  if (xml && rgxXML.test(val)) return xml(val)

  const number = +val
  if (!isNaN(number)) {
    if (bool) return !!number
    return number
  }
  return val
}
