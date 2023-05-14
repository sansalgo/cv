const { default: Link } = require('next/link')
const { forwardRef } = require('react')

const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  return <Link ref={ref} {...props} />
})

export default LinkBehavior
