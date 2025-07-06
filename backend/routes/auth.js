import express from 'express'
import { login, register, logout } from '../controllers/authControllers.js'

const router = express.Router()

router.post('/api/auth/login', login)
router.post('/api/auth/register', register)
router.get('/api/auth/logout', logout);

export default router