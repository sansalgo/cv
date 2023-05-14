import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    const { id } = req.query
    switch (req.method) {
      case 'GET':
        try {
          const record = await Record.findOne({ _id: id }).exec()
          if (!record) {
            return res.status(404).json({ message: 'Record not found' })
          }
          res.status(200).json(record)
        } catch (error) {
          return res.status(400).json({ message: 'Invalid ID provided' })
        }
        break
      case 'DELETE':
        try {
          await Record.findByIdAndDelete({ _id: id })
          return res.status(200).json({ message: 'Record deleted successfully' })
        } catch (error) {
          return res.status(500).json({ error: error.message })
        }
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
