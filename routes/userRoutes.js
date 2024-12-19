import express from 'express';
import * as User from '../controllers/userController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();



router.post('/search', User.getUser)
router.post('/', User.createUser)
router.put('/:id', validateToken, User.updateUser)


export default router