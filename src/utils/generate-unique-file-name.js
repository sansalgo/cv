const adjectives = ['busy', 'dark', 'eloquent', 'vivid', 'sunny' /* Add more adjectives */]
const nouns = ['forest', 'mountain', 'leavitt', 'river', 'ocean' /* Add more nouns */]

const generateUniqueFileName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomString = Math.random().toString(36).substr(2, 6)
  return `${adjective}-${noun}-${randomString}`
}

export default generateUniqueFileName
