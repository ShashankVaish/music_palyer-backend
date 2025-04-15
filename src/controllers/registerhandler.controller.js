import { Router } from "express";
import asynchandler from "../utils/asynchandler.js"
// import bcrypt from 'bcrypt'
// import connectdb from "../db/index.js";
import ApiErrors from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadFileCloudinary } from "./cloudinary.controllers.js";
import ApiResponse from "../utils/ApiResponse.js";

// const router = Router()
const generateRefreshtokenandAccesstoken = async (userid)=>{
    const user = await User.findById({userid})
    if(!user){
        throw new ApiErrors(406,"caanot find the user on generating accestoken and refreshtoken")

    }
    const AccessToken = user.AcessTokengenerate(userid)
    const RefreshToken = user.RefreshTokenGenerate(userid)
    user.RefreshToken = RefreshToken
    user.save({validateBeforeSave:false})
    return {AccessToken,RefreshToken}

    

}
const registerhandle = asynchandler(async (req,res)=>{
    // res.status(200).json({msg:"succesfully run"})
    const {username,email,fullname,password } = req.body
    if ([username,email,fullname,password ].some((feild)=> feild.trim()==="")) {
        throw new ApiErrors(404,"please provide all data")
    }
    if( await User.findOne({$or:[{username},{email}]})){
        throw new ApiErrors(400,"user is alreday exist")
    }
    const avatarimageLocalpath = req.files?.avatar[0]?.path
    
    if(!avatarimageLocalpath){
        throw new ApiErrors(400,"please give the avatar image ")

    }
    let coverImageLocalpath
    if(req.files && Array.isArray(req.files.coverphoto) && req.files.coverphoto.length>1){
        const coverImageLocalpath = req.files.coverphoto[0].path


    }
    // console.log(avatarimageLocalpath)
    // console.log("this is files in ")
    // console.log(req.files)
    
    const cloudinaryAvatar=await uploadFileCloudinary(avatarimageLocalpath)
    const cloudinaryCoverimage = await uploadFileCloudinary(coverImageLocalpath)
    console.log(cloudinaryAvatar)
    
    

    // create user in database
    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar: cloudinaryAvatar.url,
        coverphoto:cloudinaryCoverimage?.url || "",


    })
    const usercreated  = await User.findById({_id:user._id }).select("-password -RefreshToken")
    if(!usercreated){
        throw new ApiErrors(409,"database cannot store data or server error ")

    }
    res.status(200).json( new ApiResponse(200,usercreated))



    

    
})
const loginhandle = asynchandler(async (req,res)=>{
    // get the user credentials
    // check the credentail
    // verify the credentail from database 
    // check the password 
    // generate the refreshtoeken and accesstoken
    const {username,email,password} = req.body
    if(username || email){
        throw new ApiErrors(401,"please give the email or username")
    }
    const user = await User.findOne({$or:[{username},{email}]})
    if(!user){
        throw new ApiErrors(410,"Not found the user")

    }
    const passwordcheck = await user.isPasswordCorrect(password)
    if(!passwordcheck){
        throw new ApiErrors(402,"invalid password ")
    }
    const {AccessToken,RefreshToken} = await generateRefreshtokenandAccesstoken(user._id)
    const logginduser = await user.findById(user._id).select("-password -RefreshToken")
    return res
    .status(200)
    .cookie('accesstoken',AccessToken)
    .cookie('refreshtoken',RefreshToken)
    .json( new ApiResponse(200,{
        user: logginduser,RefreshToken,AccessToken
    }))


    




})
export {registerhandle,loginhandle}
