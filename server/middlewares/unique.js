// Import AppModel
import AppModel from "../models/appModels";

export const ipIsUnique = async (req, res, next) => {
  const {ipAdress} = req.body 
  const {slug} = req.params
  const ipIsExist = await AppModel.findOne().or(
    [
      {slug, blockList:{$in:[ipAdress]}}, 
      {slug, allowList:{$in:[ipAdress]}}
    ]
  )
  if (ipIsExist) {
    const listType = ipIsExist.blockList.includes(ipAdress) ? 'yasaklı listesinde' : 'izin verilenler listesinde'
    res.status(400).json({status: false, message: `${ipAdress} ip adresi zaten ${listType} kayıtlı`})
  }else {
    next();
  }
}

export const appIsUnique = async (req, res, next) => {
  const {name} = req.body
  const userId = req.header('userId')
  const checkName = await AppModel.findOne({
    name: name, 
    userId: userId})
  if(checkName) {
    res.status(400).json({status: false, message: `${name} adında uygulama zaten kayıtlı`})
  }else {
    next();
  }
}