import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import schema from '@/utils/validation-schema'
import formatRecord from '@/utils/format-record'

export async function getAPIRecord(id, session) {
  try {
    const record = await Record.findOne({ _id: id, user: session.user.id })
    if (!record) {
      return { status: 404, json: { message: 'Record not found' } }
    }
    return { status: 200, json: record }
  } catch (error) {
    return { status: 400, json: { message: 'Invalid ID provided' } }
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
    const { id } = req.query
    switch (req.method) {
      case 'GET':
        const { status, json } = await getAPIRecord(id, session)
        res.status(status).json(json)
        break
      case 'PUT':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }

        const validationFields = Object.keys(body).map(value => ({ field: value }))

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

        console.log(validatedBody)
        const updatedRecord = await Record.findOneAndUpdate(
          { _id: id, user: session.user.id },
          formatRecord(validatedBody)
        )
        if (!updatedRecord) {
          return res.status(404).json({ message: 'Record not found' })
        }
        res.status(200).json({ message: 'Record updated successfully' })
        break
      case 'DELETE':
        try {
          const deletedRecord = await Record.findOneAndDelete({ _id: id, user: session.user.id })
          if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' })
          }
          res.status(200).json({ message: 'Record deleted successfully' })
        } catch (error) {
          res.status(500).json({ error: error.message })
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
