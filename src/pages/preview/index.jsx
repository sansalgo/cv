import reverseFormatRecord from '@/utils/reverse-format-record'
import Preview from '@/views/preview'
import { Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'

export default ({ record }) => {
  const router = useRouter()
  const { blobURL } = router.query
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
      <Preview record={record} />
      <Button onClick={onClick}>back </Button>
      <Button onClick={onSubmit}>save </Button>
    </div>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  if (query.id) {
    const { data: record } = await axios.get(`http://localhost:3000/api/records/${query.id}`, {
      headers: {
        cookie: req.headers.cookie
      }
    })

    return {
      props: { record: reverseFormatRecord(record) }
    }
  }
  return { props: { record: {} } }
}
