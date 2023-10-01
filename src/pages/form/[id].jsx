import reverseFormatRecord from '@/utils/reverse-format-record'
import Form from '@/views/form'
import axios from 'axios'
import { getAPIRecord } from '../api/records/[id]'
import connectToDatabase from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

export default ({ record }) => <Form record={record} />

export const getServerSideProps = async ({ req, params, res }) => {
  await connectToDatabase()
  const session = await getServerSession(req, res, authOptions)
  const { status, json } = await getAPIRecord(params.id, session)

  if (status !== 200) {
    return {
      notFound: true
    }
  }
  return {
    props: { record: reverseFormatRecord(JSON.parse(JSON.stringify(json))) }
  }
}
