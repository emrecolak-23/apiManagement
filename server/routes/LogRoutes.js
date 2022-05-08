// Import Packages
import express from 'express'

// Import Contollers
import LogController from '../controllers/LogController'

const logController = new LogController()

// Declare router
const router = express.Router()

router.route("/").get(logController.getLogs)
                 .delete(logController.removeAllLogs)
export default router
