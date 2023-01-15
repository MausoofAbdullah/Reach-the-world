import express from 'express'
import { loginUser, registerUser,verifyUser } from '../controllers/AuthController.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify-user', verifyUser)
router.post('/login',loginUser)
export default router