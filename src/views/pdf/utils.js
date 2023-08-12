export const accessObj = data => path => {
  return path.split('.').reduce((previousValue, currentValue) => {
    if (previousValue) {
      return previousValue[currentValue]
    } else {
      return undefined
    }
  }, data)
}

export const formatMonthYear = value => {
  const date = new Date(value).toLocaleDateString('default', {
    month: 'short',
    year: 'numeric'
  })
  const today = new Date().toLocaleDateString('default', {
    month: 'short',
    year: 'numeric'
  })
  return date === today ? 'Present' : date
}
