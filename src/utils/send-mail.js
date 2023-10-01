import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDINBLUE_USERNAME,
    pass: process.env.SENDINBLUE_PASSWORD
  }
})

const verifyMailContent = (username, otp) =>
  `Hi ${username},

  We've received your request for an OTP verification code for your account with CV.

  Your OTP verification code is: ${otp}

  If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.

  Thanks,
  CV`

export const sendVerifyMail = async (to, username, otp) => {
  const info = await transporter.sendMail({
    from: `CV <${process.env.SENDINBLUE_USERNAME}>`,
    to,
    subject: 'OTP Verification',
    text: verifyMailContent(username, otp)
  })
}
