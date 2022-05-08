// Import Model
import LogModels from "../models/logModels";

class LogController {
  async getLogs(req,res) {
    try {
      const userId = req.header('userId')
      const {limit} = req.query
      const logs = await LogModels.find({userId}).limit(limit != 'all' ? limit : null).sort('-createdAt')
      res.status(200).json({status: true, message: 'Loglar başarılı bir şekilde listelendi', logs})
    } catch(error) {
      res.status(400).json({status: false, message: 'Beklenmedik bir hata oluştu'})
    }
    
  }
  
  async removeAllLogs(req, res) {
    const userId = req.header('userId')
    try {
      const deleteAll = await LogModels.deleteMany({userId});
      console.log(deleteAll);
      res.status(200).json({status: true, message: 'Bütün kayıtlarınız silinmiştir'})
    } catch(error) {
      res.status(500).json({status: false, message: 'Geçmiş kayıtlarınız beklenmedik bir hatadan dolayı silinememiştir'})
    }

  }
}

export default LogController