import express from 'express'
import { getUser, updateUser } from '../controllers/userControllers.js'
import {requireAuth} from '../middlewares/jwtChecker.js'
const router = express.Router()

router.get('/api/users/me', requireAuth, getUser)
router.put('/api/users/update/:id', requireAuth, updateUser)

export default router
