const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adjectives = ['busy', 'dark', 'eloquent', 'vivid', 'sunny' /* Add more adjectives */]
const nouns = ['forest', 'mountain', 'leavitt', 'river', 'ocean' /* Add more nouns */]

function generateUniqueFileName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomString = Math.random().toString(36).substr(2, 6)
  return `${adjective}-${noun}-${randomString}`
}

const introSchema = new Schema({
  firstName: String,
  lastName: String,
  position: String,
  email: String,
  phone: String,
  city: String,
  linkedin: String,
  github: String
})

const employmentHistorySchema = new Schema({
  position: String,
  companyName: String,
  startDate: Date,
  endDate: Date,
  location: String,
  description: String
})

const educationSchema = new Schema({
  course: String,
  institution: String,
  startDate: Date,
  endDate: Date,
  location: String,
  percentage: Number
})

const recordSchema = new Schema(
  {
    fileName: {
      type: String,
      unique: true,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    intro: introSchema,
    profileSummary: String,
    employmentHistory: [employmentHistorySchema],
    education: [educationSchema],
    extras: [String],
    skills: [String],
    projects: [String],
    languages: [String],
    achievement: [String],
    draft: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

recordSchema.pre('findOneAndUpdate', async function (next) {
  let currentFileName = generateUniqueFileName()
  while (true) {
    const existingRecord = await this.model.findOne({ fileName: currentFileName })
    if (existingRecord) {
      currentFileName = generateUniqueFileName()
      continue
    }
    break
  }
  this._update.fileName = currentFileName

  next()
})

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema)

export default Record
