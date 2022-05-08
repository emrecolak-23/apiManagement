// Import Schema
import mongoose from "mongoose";

// Declare Schema
const Schema = mongoose.Schema

// Create Log Schema
const LogSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["auth", "app"],
    required: true
  },
  description: {
    type: String
  },
  ipLocation: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create Log Model
const LogModels = mongoose.model('Log', LogSchema);

export default LogModels