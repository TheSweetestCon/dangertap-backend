import express from 'express';
import * as Location from '../controllers/locationController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.use(validateToken)

router.get('/', Location.getLocation)
router.post('/', Location.setLocation)

export default router