import dynamic from 'next/dynamic'

const pdf = dynamic(() => import('../../views/preview'), { ssr: false })

export default pdf
