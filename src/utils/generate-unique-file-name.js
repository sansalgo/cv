import fs from 'fs'

const generateUniqueFileName = () => {
  const words = fs.readFileSync('src/data/wordlist10000.txt', 'utf-8').split('\n')
  const randomWord0 = words[Math.floor(Math.random() * words.length)]
  const randomWord1 = words[Math.floor(Math.random() * words.length)]
  const randomString = Math.random().toString(36).substring(2, 8)
  return `${randomWord0}-${randomWord1}-${randomString}`
}

export default generateUniqueFileName
