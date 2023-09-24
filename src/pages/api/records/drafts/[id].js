import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
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
      case 'PATCH':
        const updatedDraftRecord = await Record.findOneAndUpdate(
          { _id: id, user: session.user.id, draft: true },
          { draft: false }
        )
        if (!updatedDraftRecord) {
          return res.status(404).json({ message: 'Draft not found' })
        }
        res.status(200).json({ message: 'Draft updated successfully' })
        break
      default:
        res.setHeader('Allow', ['PATCH'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
