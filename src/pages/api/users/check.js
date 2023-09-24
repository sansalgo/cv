import connectToDatabase from '@/lib/mongodb'
import userCheck from '@/utils/user-check'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }
        const { status, json } = await userCheck(body)
        res.status(status).json(json)
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
