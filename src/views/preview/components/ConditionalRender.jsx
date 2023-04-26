export default ({ value, children }) => {
    console.log(value)
    return value.length > 0 ? children : null
}
