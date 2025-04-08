import { Router } from "express";
import asynchandler from "../utils/asynchandler.js"
const router = Router()
const registerhandle = asynchandler(async (req,res)=>{
    res.status(200).json({msg:"succesfully run"})
})
export {registerhandle}
