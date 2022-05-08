// Import Packages
import express from 'express';

// Import Controller
import AppController from '../controllers/AppController';

// Import Validation
import {createValidation, updateValidation, allowBlockValidation} from '../validations/App'
// Import Middleware
import validate from '../middlewares/validate'
import {ipIsUnique, appIsUnique} from '../middlewares/unique';
const appController = new AppController()
// Create Router
const router = express.Router()
router.route('/').get(appController.getAllApp);
router.route('/').post(validate(createValidation),appIsUnique,appController.createApp);

router.route('/:slug').put(validate(updateValidation),appController.updateApp);
router.route('/:slug').delete(appController.deleteApp);
router.route('/all').delete(appController.deleteAllApps);
router.route('/:slug').get(appController.getApp);

router.route('/add-to-block/:slug').post(validate(allowBlockValidation),ipIsUnique,appController.addBlockList);
router.route('/add-to-allow/:slug').post(validate(allowBlockValidation),ipIsUnique,appController.addAllowList);
router.route('/remove-to-block/:slug').post(validate(allowBlockValidation),appController.removeBlockList);
router.route('/remove-to-allow/:slug').post(validate(allowBlockValidation),appController.removeAllowList);


router.route('/logs').get(appController.getAllAppLogs);
router.route('/logs/:slug').get(appController.getAppLogs);
router.route('/logs-date/:appId').get(appController.getAppLogsByDate);
// router.route('/:slug/:userId').get(appController.getApiKey);


export default router