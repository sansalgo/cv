import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

const connection = {}

async function connectToDatabase() {
  if (connection.isConnected) {
    console.log('Using existing database connection')
    return
  }

  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  connection.isConnected = db.connections[0].readyState
  console.log('New Database connection')
}

export default connectToDatabase
