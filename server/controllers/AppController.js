// Import Packages
import mongoose from 'mongoose'
// Import Model
import AppModels from "../models/appModels"
import AppLogModel from "../models/appLogModels";
// Import Utils
import {createLog, getAppName} from '../utils/index'

class AppController {

  async createApp(req, res, next) {
    
    try {

      const {name, apiKey, description} = req.body;
      const userId = req.header('userId');

      const app = await AppModels.create({name, userId, apiKey, description})
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${name} adında uygulama oluşturuldu`   
        }
      )
      res.status(201).json({status: true, message: 'Uygulamanız oluşturulmuştur', app})
    } catch(error) {
      res.status(400).json({
        status: false,
        message: error
      })
    }

  }

  async updateApp(req, res, next) {

    try {

      const {name, apiKey, description, time, limit} = req.body;
      const {slug} = req.params
      const userId = req.header('userId');
      const appName = await getAppName(slug)
      const app = await AppModels.findOneAndUpdate({slug,userId},
        {
          name, apiKey, description, time, limit
        }
      )
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${appName} adında uygulama güncellendi`   
        }
      )
      res.status(201).json({status: true, message:'Uygulamanız güncellenmiştir', app})
           
    } catch(error) {
      res.status(400).json({
        status: false,
        message: error
      })
    }

  }

  async addBlockList(req, res) {
    try {
      const {slug} = req.params
      const {ipAdress} = req.body
      const userId = req.header('userId');
      const add = await AppModels.findOneAndUpdate(
        {
          slug, userId
        },
        {
          $push: {blockList: ipAdress}
        }
      )
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${ipAdress} ip adresi yasaklananlar listesine eklendi`   
        }
      )
      res.status(201).json({status:true, message: `${ipAdress} ip adresi yasaklı listesine eklenmiştir`})

    } catch(error) {
      res.status(400).json({
        status: false,
        message: error
      })
    }
  }

  async addAllowList(req,res) {
    try {
      const {ipAdress} = req.body;
      const {slug} = req.params
      const userId = req.header('userId');
      const add = await AppModels.findOneAndUpdate(
        {
          slug, userId
        },
        {
          $push: {allowList: ipAdress}
        }
      )
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${ipAdress} ip adresi izin verilenler listesine eklendi`   
        }
      )
      res.status(201).json({status: true, message: `${ipAdress} ip adresi izin verilenler listesine eklenmiştir`})
    } catch(error) {
      res.status(400).json({status: false, message: error})
    }
  }

  async removeAllowList(req, res) {
    try {
      const {ipAdress} = req.body;
      const {slug} = req.params;
      const userId = req.header('userId');

      const remove = await AppModels.updateOne(
        {
          slug, userId
        },
        {
          $pull: {allowList: ipAdress}
        }
      )
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${ipAdress} ip adresi izin verilenler listesinden kaldırıldı`   
        }
      )
      res.status(201).json({status:true, message: `${ipAdress} ip adresi izin verilenler listesinden kaldırıldı`})

    } catch(error) {
      res.status(400).json({status: false, message: 'Beklenmedik bir hata oluştu'})
    }
  }

  async removeBlockList(req, res) {
    try {
      const {ipAdress} = req.body
      const {slug} = req.params
      const userId = req.header('userId');

      const remove = await AppModels.updateOne(
        {
          slug, userId
        },
        {
          $pull: {blockList: ipAdress}
        }
      )
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${ipAdress} ip adresi yasaklananlar listesinden kaldırıldı`   
        }
      )
      res.status(201).json({status: true, message: `${ipAdress} ip adresi yasaklı listesinden kaldırıldı`})
    } catch(error) {
      res.status(400).json({status: false, message: 'Beklenmedik bir hata oluştu'})
    }
  }

  async deleteApp(req, res) {
    try {
      const {slug} = req.params
      const appName = await getAppName(slug)
      const userId = req.header('userId');
      const deleteApp = await AppModels.findOneAndRemove({slug, userId})
      createLog(
        {
          type: "app",
          userId: userId,
          description: `${appName} adındaki uygulamanız silinmiştir`   
        }
      )

      res.status(200).json({status:true, message:`Uygulamanız başarılı bir şekilde kaldırılmıştır`})
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  async deleteAllApps(req, res) {
    try {
      const userId = req.header('userId')
      const deleteApps = await AppModels.deleteMany({userId})
      createLog(
        {
          type: "app",
          userId: userId,
          description: 'Tüm uygulamalarınız silinmiştir'   
        }
      )
      res.status(200).json({status:true, message:'Tüm uygulamalarınız silinmiştir'})
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  async getAllApp(req, res) {
    try {
      const userId = req.header('userId');
      const allApps = await AppModels.find({userId})
      res.status(200).json(allApps);
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  async getApp(req, res) {
    try {
      const userId = req.header('userId')
      const slug = req.params.slug
      const app = await AppModels.find({slug: slug, userId:userId})
      if (app) {
        res.status(200).json(app);
      } else {
        res.status(400).json({status: false, message: 'Böyle bir uygulama bulunamadı'})
      }

    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  ///---- Logs Section ///
  async getAllAppLogs(req, res) {
    try {
      const userId = req.header('userId');
      const allAppLogs = await AppLogModel.find({userId})
      res.status(200).json(allAppLogs);
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  async getAppLogs(req, res)  {
    try {
      const {slug} = req.params
      const appLogs = await AppLogModel.find({slug});
      res.status(200).json(appLogs)
    } catch(error) {
      res.status(400).json({status:false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

  async getAppLogsByDate(req, res) {
    try {
      const {appId} = req.params
      const dates = await AppLogModel.aggregate(
        [
          {
            $match: {
              appId: mongoose.Types.ObjectId(appId)
            }
          },
          { $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
              total: { $sum: 1 }
            }
          }
        ]
      )
      res.status(200).json(dates)
    } catch(error) {
      res.status(400).json({status: false, message: 'Beklenmedik bir sorun oluştu'})
    }
  }

}

export default AppController