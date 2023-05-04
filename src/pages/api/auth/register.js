import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const user = new User(req.body)
        try {
          const newUser = await user.save()
          res.status(200).json(newUser)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
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
