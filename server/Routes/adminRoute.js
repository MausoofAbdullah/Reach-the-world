import express from "express"
import {adminRegister,adminLogin,adminUserList,blockUser,unblockUser,getAllReports,removePost} from "../controllers/AdminController.js"

const router=express.Router()

router.post('/',adminRegister)
router.post('/login',adminLogin)
router.get('/user-list',adminUserList)

router.post('/block-user',blockUser)
router.post('/unblock-user',unblockUser)


router.get('/reports', getAllReports)
router.delete('/remove-post',removePost)
export default router