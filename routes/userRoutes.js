import express from 'express';
import {getUsers, createUser, updateUser} from '../controllers/userController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.use(validateToken)

router.get('/', getUsers)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router