import express from 'express';
import {getUsers, createUser, updateUser, getResponsavel, setLocation, getLocation} from '../controllers/userController.js'
import { validateToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

//router.use(validateToken)

router.get('/', getUsers)
router.get('/responsavel', getResponsavel)
router.get('/location', getLocation)

router.post('/', createUser)
router.post('/location', setLocation)

router.put('/:id', updateUser)


export default router