import { Children } from 'react'

const ConditionalRender = ({ condition, children }) => {
  const childrenCount = Children.count(children)
  if (childrenCount > 2) {
    throw new Error('Invalid children count. The children count must be less than two')
  }
  return childrenCount === 2 ? (condition ? children[0]() : children[1]()) : condition ? children() : null
}

export default ConditionalRender
