const paginate = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  return data.slice(startIndex, endIndex)
}


export default paginate