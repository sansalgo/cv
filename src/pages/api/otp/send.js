import connectToDatabase from '@/lib/mongodb'
import OTP from '@/models/otp'
import generateOTP from '@/utils/generate-otp'
import { sendVerifyMail } from '@/utils/send-mail'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }
        const { email, username } = body

        if (!email || !username) {
          return res.status(400).json({ message: 'Email and Username is required' })
        }

        const generatedOTP = generateOTP()

        await OTP.findOneAndUpdate({ email }, { otp: generatedOTP }, { new: true, upsert: true })
        try {
          await sendVerifyMail(email, username, generatedOTP)
        } catch (error) {
          console.log(error)
          return res.status(500).json({ message: 'Something went wrong' })
        }
        res.status(200).json({ message: 'OTP sent successfully' })
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
