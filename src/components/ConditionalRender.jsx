import { Children } from 'react'

const ConditionalRender = ({ condition, children, ...rest }) => {
  const childrenCount = Children.count(children)
  if (childrenCount > 2) {
    throw new Error('Invalid children count. The children count must be less than two')
  }
  return childrenCount === 2 ? (condition ? children[0](rest) : children[1](rest)) : condition ? children(rest) : null
}

export default ConditionalRender
