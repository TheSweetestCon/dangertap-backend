import express from 'express';
import * as Responsavel from '../controllers/responsavelController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

//router.use(validateToken)

router.get('/', Responsavel.getResponsavel)
router.post('/', Responsavel.setResponsavel)


export default router