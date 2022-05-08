// Import Packages
import jwt from 'jsonwebtoken'
import axios from 'axios'
import ip from 'ip'
// Import Models
import LogModels from '../models/logModels'
import AppModel from '../models/appModels'

export const toJsonWebToken = (obj) => {
  return jwt.sign({obj}, process.env.JWT_SECRET_ID)
}

export const decodedJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_ID)
}

export const getIpLocation = async (ipAdress) => {

  // change to 176.42.27.143 for production
  const response = await axios.get('http://api.ipapi.com/176.42.27.143?access_key=9dee06d3a32bc49bc7bb12c57ef99ba3')
  
  const {ip, country_code, country_name, longitude, latitude } = response.data
  return {
    ip, country_code, country_name, longitude, latitude
  }
  
}

export const getAppName = async (slug) => {
  const appName = await AppModel.findOne({slug})
  const {name} = appName
  return name
}

export const createLog = async ({type, userId, description}) => {
  // Change 176.42.27.143 to req.api for production
  // This work on local development
  const ipLocation = await getIpLocation("176.42.27.143")
  const log = await LogModels.create(
    {
      type,
      userId,
      description,
      ipLocation
    }
  )
  return log
}