import connectToDatabase from '@/lib/mongodb'
import OTP from '@/models/otp'
import { generateSign } from '@/utils/verification-sign'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }
        const { email, otp } = body

        if (!email || !otp) {
          return res.status(400).json({ message: 'Email and OTP are required' })
        }

        const findOTP = await OTP.findOne({ email, otp }).exec()

        if (!findOTP) {
          return res.status(401).json({ message: 'Invalid OTP' })
        }

        const tenMinutes = 10 * 60

        console.log(findOTP.updatedAt.getTime())

        if (findOTP.updatedAt.getTime() < Date.now() - tenMinutes) {
          return res.status(408).json({ message: 'OTP has expired' })
        }

        await OTP.deleteOne({ _id: findOTP._id })
        const verificationSign = generateSign({ email })
        res.status(200).json({ verificationSign })
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
