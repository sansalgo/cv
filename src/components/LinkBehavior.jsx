import Link from 'next/link'
import { forwardRef } from 'react'

const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  return <Link ref={ref} {...props} />
})

export default LinkBehavior
