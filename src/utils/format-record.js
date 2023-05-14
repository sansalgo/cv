const formatRecord = data => {
  data.skills = data.skills.map(({ value }) => value)
  data.achievement = data.achievement.map(({ value }) => value)
  data.projects = data.projects.map(({ value }) => value)
  data.extras = data.extras.map(({ value }) => value)
  data.languages = data.languages.map(({ value }) => value)

  return data
}

export default formatRecord
