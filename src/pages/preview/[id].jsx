import dynamic from 'next/dynamic'
const Preview = dynamic(() => import('@/views/preview'), { ssr: false })

export default Preview
