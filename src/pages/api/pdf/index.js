import { getServerSession } from 'next-auth'
import puppeteer from 'puppeteer'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    switch (req.method) {
      case 'POST':
        const body = req.body
        if (!body || Object.keys(body).length === 0) {
          return res.status(204).send()
        }
        const { id } = req.body
        if (!id) {
          return res.status(400).json({ message: 'Record ID is required' })
        }
        const browser = await puppeteer.launch({ headless: 'new' })

        const page = await browser.newPage()
        const url = `${process.env.NEXTAUTH_URL}/pdf/${id}`

        const cookies = req.headers.cookie
          ? req.headers.cookie.split(';').map(cookie => {
              const [name, value] = cookie.split('=')
              return { name: name.trim(), value: value.trim(), url }
            })
          : []

        await page.setCookie(...cookies)

        const response = await page.goto(url, { waitUntil: 'networkidle0' })
        if (!response.ok()) {
          return res.status(response.status()).json({ message: 'Something went wrong' })
        }

        await page.emulateMediaType('screen')

        const pdfBuffer = await page.pdf({
          format: 'A4'
        })

        res.setHeader('Content-Type', 'application/pdf')
        res.send(pdfBuffer)

        await browser.close()

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
