import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import formatRecord from '@/utils/format-record'

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
        const records = await Record.find().exec()
        res.status(200).json(records)
        break
      case 'POST':
        req.body.user = session.user.id
        const record = new Record(formatRecord(req.body))
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
