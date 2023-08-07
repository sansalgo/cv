import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import formatRecord from '@/utils/format-record'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

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
        const draftRecord = await Record.findOneAndUpdate(
          { user: session.user.id, draft: true },
          { draft: true },
          { new: true, upsert: true }
        ).exec()
        res.status(200).json(draftRecord)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
