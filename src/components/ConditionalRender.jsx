const ConditionalRender = ({ value, children }) => {
  const isFalsy =
    value === null ||
    value === undefined ||
    (typeof value === 'boolean' && !value) ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  return !isFalsy ? children : null
}

export default ConditionalRender
