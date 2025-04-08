import { Router } from "express";
import { registerhandle } from "../controllers/registerhandler.controller.js";

const router = Router()

router.route('/register').post(registerhandle)

export default router