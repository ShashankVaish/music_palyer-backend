import { Router } from "express";
import asynchandler from "../utils/asynchandler.js"
const router = Router()
const registerhandle = async ()=>{
    asynchandler(function(){
        console.log("the route will working succesfully ")

    })


}
export {registerhandle}
