const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    intro: introSchema,
    profileSummary: String,
    employmentHistory: [employmentHistorySchema],
    education: [educationSchema],
    extras: [String],
    skills: [String],
    projects: [String],
    languages: [String],
    achievement: [String]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema)

export default Record
