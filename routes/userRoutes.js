import express from 'express';
import {getUsers, createUser, updateUser} from '../controllers/userController.js'


const router = express.Router();

router.get('/', getUsers)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router