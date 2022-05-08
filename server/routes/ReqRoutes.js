// Import Packages
import express from 'express'

// Create router
const router = express.Router();

// Import Middleware
import { apiKey } from '../middlewares/apiKey';

// Import Controller
import RequestController from "../controllers/RequestController";

const requestController = new RequestController()

router.route('/:slug/:userId').get(apiKey,requestController.getApiKey);

export default router
