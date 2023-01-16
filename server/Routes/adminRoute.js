import express from "express"
import {adminRegister,adminLogin,adminUserList,blockUser,unblockUser} from "../controllers/AdminController.js"

const router=express.Router()

router.post('/',adminRegister)
router.post('/login',adminLogin)
router.get('/user-list',adminUserList)

router.post('/block-user',blockUser)
router.post('/unblock-user',unblockUser)

export default router