import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import formatRecord from '@/utils/format-record'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    const { id } = req.query
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    switch (req.method) {
      case 'PUT':
        const updatedDraftRecord = await Record.findOneAndUpdate({ _id: id }, req.body)
        if (updatedDraftRecord) {
          res.status(200).json({ message: 'Draft updated successfully' })
        }
        res.status(404).json({ message: 'Draft not found' })
        break
      default:
        res.setHeader('Allow', ['PUT'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
