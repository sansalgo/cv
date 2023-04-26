import Preview from '@/views/preview'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const {blobURL} = router.query
  const onClick = () => {
    router.back()
  }
  return (
    <div>

        <Preview blobURL={blobURL} />
        <Button onClick={onClick}>back </Button>
    </div>
  )
}
