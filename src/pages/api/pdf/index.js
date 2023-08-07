import puppeteer from 'puppeteer'
// import pdf from '../../../views/preview/index.pug'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        console.log(req.body)
        // const { record } = req.body
        console.log('----> check1')
        const browser = await puppeteer.launch({ headless: 'new' })

        const page = await browser.newPage()
        const url = 'http://localhost:3000/pdf'

        const cookies = req.headers.cookie
          ? req.headers.cookie.split(';').map(cookie => {
              const [name, value] = cookie.split('=')
              return { name: name.trim(), value: value.trim(), url }
            })
          : []

        await page.setCookie(...cookies)

        await page.goto(url, { waitUntil: 'networkidle0' })
        // console.log('----> check2', record)
        await page.evaluate(() => {
          localStorage.setItem('record', JSON.stringify('text-local-storage'))
        })
        console.log('----> check3')

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
