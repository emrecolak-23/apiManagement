// Import Packages
import mongoose from 'mongoose'

// Create Schema
const Schema = mongoose.Schema;

// Create AppLogSchema
const dateTime = new Date()
const AppLogSchema = new Schema({
  ipAdress: String,
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'apps'
  },
  userId: String,
  ipLocation: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create AppLogModel
const AppLogModel = mongoose.model('AppLog', AppLogSchema);

export default AppLogModel