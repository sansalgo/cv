import connectToDatabase from '@/lib/mongodb'
import Record from '@/models/record'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import formatRecord from '@/utils/format-record'
import User from '@/models/user'
import userCheck from '@/utils/user-check'

export default async function handler(req, res) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const { status, json } = await userCheck(req.body)
        return res.status(status).json(json)
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
