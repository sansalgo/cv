import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'
import userSchema from '@/schemas/user'
import { verifySign } from '@/utils/sign'
import userCheck from '@/utils/user-check'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const { username, email, verificationSign, password } = req.body

        const requiredValues = ['username', 'email', 'verificationSign', 'password']
        const exception = {}
        requiredValues.forEach(key => {
          if (!req.body[key]) {
            exception[key] = { message: 'This value is required' }
          }
        })
        if (Object.keys(exception).length) {
          return res.status(422).json(exception)
        }

        const { status, json } = await userCheck(req.body)
        if (status !== 404) {
          return res.status(status).json(json)
        }

        try {
          const error = await userSchema.validate({ email, username })
        } catch (error) {
          console.log(error)
        }

        const sign = verifySign(verificationSign)

        if (!sign || sign.email !== email) {
          return res.status(400).json({ message: 'Invalid verification sign' })
        }

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
