import express from 'express';
import * as Device from '../controllers/notificationController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

//router.use(validateToken)

router.post('/set', Device.setPushToken)
router.post('/send', Device.sendNotification)


export default router