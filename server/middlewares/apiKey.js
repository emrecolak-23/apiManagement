// Import Models
import AppModels from "../models/appModels"

let requestList = []

export const apiKey = async (req, res, next) => {
  // Get slug and userId from params
  const { slug, userId } = req.params
  // Find app by using slug and userID
  const api = await AppModels.findOne({slug, userId})
  if (api) {
    // If api exist

    // Get this constants from api as a response data 
    const {time, limit, blockList, allowList, _id} = api
    // Declare dummy api for local operation
    const ipAdress = "8.8.8.9"
    // whether request list include this app id or not checking
    const request = requestList.filter(r => r == _id)
    
    if(request.length>limit) {
      // request length exceed limit
      res.status(429).json({status: false, message: 'Çok fazla istekte bulundunuz. Lütfen daha sonra deneyiniz.'})
      // clear request time and functionality
      setTimeout(() => {
         requestList = requestList.filter(request => request != _id)
         // Clear
      }, time);
    } else {
      // request length not exceed limit
      if (allowList.length) {
        // allow list include ipAddress in app
        if (allowList.includes(ipAdress)) {
          req.api = api
          // for request quantity check
          requestList.push(_id.toString())
          next();
        }else {
          // allow list not include ipAddress in app
          res.status(405).json({status: false, message:'Bu servise erişim izniniz yok'})
        }
      } else {
        // Global check for app with ipaddress
        if (blockList.includes(ipAdress)) {
          // blocklist includes ipAdress in this app
          res.status(405).json({status: false, message:'Bu servise erişim izniniz yok'})
        } else {
          // global access
          req.api = api
          // for request quantity check
          requestList.push(_id.toString())
          next();
        }
      }

    }    
  } else {
    res.status(400).json({status:false, message: 'Böyle bir servis bulunamadı'})
  }
}