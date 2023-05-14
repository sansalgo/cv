const formatDateTime = dateTimeString => {
  const dateTime = new Date(dateTimeString)
  const year = dateTime.getFullYear()
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2)
  const day = ('0' + dateTime.getDate()).slice(-2)
  const hours = ('0' + dateTime.getHours()).slice(-2)
  const minutes = ('0' + dateTime.getMinutes()).slice(-2)

  return `${month}/${day}/${year} ${hours}:${minutes}`
}

export default formatDateTime
