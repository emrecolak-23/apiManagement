// Import Packages
import express from 'express'
import cors from 'cors'
// Import Routes
import AuthRoutes from './routes/AuthRoutes'
import AppRoutes from './routes/AppRoutes'
import LogRoutes from './routes/LogRoutes'
import RecRoutes from './routes/ReqRoutes'
// Declare Router
const router = express.Router();

router.use('/auth/auth-callback',cors({origin: 'http://localhost:8080'}),AuthRoutes);
router.use('/app',cors({origin: 'http://localhost:8080'}),AppRoutes)
router.use('/logs',cors({origin: 'http://localhost:8080'}),LogRoutes)
router.use('/api-service', cors(), RecRoutes)

export default router