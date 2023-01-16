import express from 'express'
<<<<<<< HEAD
import { loginUser, registerUser,verifyotp,resendotp } from '../controllers/AuthController.js'
=======
import { loginUser, registerUser,verifyUser } from '../controllers/AuthController.js'
>>>>>>> otpSignup

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify-user', verifyUser)
router.post('/login',loginUser)
router.post('/verifyotp',verifyotp)
router.post('/resendotp',resendotp)
export default router