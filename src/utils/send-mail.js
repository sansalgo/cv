const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDINBLUE_USERNAME,
    pass: process.env.SENDINBLUE_PASSWORD
  }
})

const registerVerifyMailContent = (username, otp) => `Hello ${username},<br>

Thank you for signing up with our platform. To complete the registration process, please enter the following OTP (One-Time Password):<br>

OTP: ${otp}<br>

If you did not initiate this sign-up request, please ignore this email.<br>

Best regards,<br>
CV`

export const sendRegisterVerifyMail = async (to, username, otp) => {
  console.log(process.env.SENDINBLUE_USERNAME)
  const info = await transporter.sendMail({
    from: `CV <${process.env.SENDINBLUE_USERNAME}>`,
    to,
    subject: 'Register OTP Verification',
    html: registerVerifyMailContent(username, otp)
  })
}
