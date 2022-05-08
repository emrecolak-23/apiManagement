// Import Packages
import express from 'express';

// Import Controller
import AuthController from '../controllers/AuthController';

// Autcontroller object
const authController = new AuthController()

// Declare router
const router = express.Router();

router.route('/').get(authController.authorize);
router.route('/me').get(authController.authentication);


export default router