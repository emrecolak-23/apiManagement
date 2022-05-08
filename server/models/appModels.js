// Import Packages
import mongoose from 'mongoose'
import slugify from 'slugify'
// Declare Schema
const Schema = mongoose.Schema

// App Schema

const AppSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  slug: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    maxlength: 200,
    required: true
  },
  description: {
    type: String,
    default: "",
    maxlength: 500
  },
  time: {
    type: Number,
    required: true,
    default: 10000
  },
  limit: {
    type: Number,
    required: true,
    default: 10
  },
  blockList: [],
  allowList: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

AppSchema.pre('save', function(next) {
  
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  })
  next();
})

// Create Model
const AppModel = mongoose.model('App', AppSchema);

export default AppModel