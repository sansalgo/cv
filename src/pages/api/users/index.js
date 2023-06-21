import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'
import userCheck from '@/utils/user-check'
import schema from '@/utils/validation-schema'
import { verifySign } from '@/utils/verification-sign'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'PATCH':
        const { username, email, verificationSign, password } = req.body
        const validationFields = [
          { field: 'username', level: 'required' },
          { field: 'email' },
          { field: 'verificationSign' },
          { field: 'password' }
        ]

        const { status, json } = await userCheck(req.body)
        if (status === 404) {
          return res.status(status).json(json)
        }

        try {
          const error = await schema(validationFields).validate(
            { username, email, password, verificationSign },
            { abortEarly: false }
          )
        } catch ({ inner }) {
          const validationError = {}
          inner.forEach(({ path, message }) => {
            validationError[path] = { message }
          })

          return res.status(400).json(validationError)
        }

        const sign = verifySign(verificationSign)

        if (!sign || sign.email !== email) {
          return res.status(400).json({ message: 'Invalid verification sign' })
        }

        const user = await User.findOne({ username, email }).exec()
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        user.password = password
        try {
          await user.save()
          res.status(200).json({ message: 'User updated successfully' })
        } catch (error) {
          console.log(error)
          res.status(500).json({ message: 'Something went wrong' })
        }
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
