const rgxWord = new RegExp(
  [
    // two or more upper case chars followed by a word, or a boundary
    '[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|[^A-Za-z0-9]|$)',
    // Characters followed by numbers, optionally with UC leader
    '[A-Z]?[a-z]+[0-9]*',
    // Single UC char
    '[A-Z]',
    // string of digits
    '[0-9]+'
  ].join('|'),
  'g'
)

export default function camelCase (input) {
  if (!input) return input
  const s = input
    .match(rgxWord)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
  return s.charAt(0).toLowerCase() + s.slice(1)
}

camelCase.rgx = rgxWord
