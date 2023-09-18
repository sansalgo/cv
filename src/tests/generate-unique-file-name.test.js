import generateUniqueFileName from '@/utils/generate-unique-file-name'

test('generated name should match the expected format', () => {
  const name = generateUniqueFileName()
  const regex = /^[a-z]+-[a-z]+-[a-z0-9]{6}$/ // Expected format

  expect(regex.test(name)).toBe(true)
})

test('generated names should be unique', () => {
  const name0 = generateUniqueFileName()
  const name1 = generateUniqueFileName()

  expect(name0).not.toEqual(name1)
})
