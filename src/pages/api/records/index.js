import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'GET':
        const records = await Record.find().exec()
        res.status(200).json(records)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} Not Allowed` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
