import jwt from 'jsonwebtoken'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

const generateSign = data => {
  const sign = jwt.sign(data, NEXTAUTH_SECRET)
  return sign
}

const verifySign = sign => {
  try {
    const verifiedSign = jwt.verify(sign, NEXTAUTH_SECRET)
    return verifiedSign
  } catch {
    return null
  }
}

export { generateSign, verifySign }
