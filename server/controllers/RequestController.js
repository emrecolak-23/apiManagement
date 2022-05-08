// Import Model
import AppModels from "../models/appModels"
import AppLogModel from "../models/appLogModels"

// Import Utils Function
import {getIpLocation} from '../utils' 

class RequestController {

  async getApiKey(req, res) {
    try {
      const ipAdress = "8.8.8.9"
      const userId = req.header('userId')
      const ipLocation = await getIpLocation(ipAdress);
      await AppLogModel.create({ipAdress, userId, ipLocation, appId: req.api._id})
      res.status(200).json({apiKey: req.api.apiKey})
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir hata oluştu'})
    }
  }
}

export default RequestController