import Preview from '@/views/preview'
import { Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const {blobURL} = router.query
  const onClick = () => {
    router.back()
  }
  const onSubmit = () => {
    const formData = localStorage.getItem('formData')
       axios
         .post('/api/records/', JSON.parse(formData))
         .then(response => {
           console.log(response)
         })
         .catch(error => console.log(error))
  }
  return (
    <div>

        <Preview blobURL={blobURL} />
        <Button onClick={onClick}>back </Button>
        <Button onClick={onSubmit}>save </Button>
    </div>
  )
}
