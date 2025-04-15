import { Router } from "express";
import { loginhandle, registerhandle } from "../controllers/registerhandler.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route('/register').post(upload.fields([{
    name:'avatar',
    maxCount:1
},{
    name:'coverphoto',
    maxCount:1
}]),registerhandle)
router.route('/login').post(loginhandle)
export default router