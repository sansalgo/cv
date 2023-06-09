import connectToDatabase from '@/lib/mongodb'
import OTP from '@/models/otp'
import generateOTP from '@/utils/generate-otp'
import { sendRegisterVerifyMail } from '@/utils/send-mail'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const { email } = req.body

        console.log(email)

        if (!email) {
          return res.status(400).json({ error: 'Email is required' })
        }

        const generatedOTP = generateOTP()

        await OTP.findOneAndUpdate({ email }, { otp: generatedOTP }, { new: true, upsert: true })
        try {
          await sendRegisterVerifyMail(email, 'san', generatedOTP)
        } catch (error) {
          // return res.status(500).json({error: 'Something went wrong'})
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
