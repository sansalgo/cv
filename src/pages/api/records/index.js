import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import formatRecord from '@/utils/format-record'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import paginate from '@/utils/paginate'
import schema from '@/utils/validation-schema'

export async function getAPIRecords(req, session) {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.page_size) || 6

  const records = await Record.find({ user: session.user.id, draft: false })
  const paginatedRecords = paginate(records, page, pageSize)

  return {
    count: records.length,
    page,
    page_size: pageSize,
    results: paginatedRecords
  }
}

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    switch (req.method) {
      case 'GET':
        const resObj = await getAPIRecords(req, session)
        res.status(200).json(resObj)
        break
      case 'POST':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }
        const validationFields = [
          { field: 'fileName' },
          { field: 'intro' },
          { field: 'profileSummary' },
          { field: 'employmentHistory' },
          { field: 'education' },
          { field: 'extras' },
          { field: 'skills' },
          { field: 'projects' },
          { field: 'languages' },
          { field: 'achievement' }
        ]

        let validatedBody = {}
        try {
          validatedBody = await schema(validationFields).validate(body, { abortEarly: false, stripUnknown: true })
        } catch ({ inner }) {
          const validationError = {}
          inner.forEach(({ path, message }) => {
            validationError[path] = { message }
          })

          return res.status(400).json(validationError)
        }

        validatedBody.user = session.user.id

        const record = new Record(formatRecord(validatedBody))
        try {
          const newRecord = await record.save()
          res.status(200).json(newRecord)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
