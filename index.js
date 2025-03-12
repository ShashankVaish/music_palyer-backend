// import mongoose from "mongoose";
// import { dbname } from "./constants";
// ;(async ()=>{
//     try {
//         mongoose.connect(`${process.env.MONGODB_URL}/${dbname}`)
//     } catch (error) {
//         console.error("error",error)
//     }



// })()



import dotenv from 'dotenv';
dotenv.config({ path: '/env' });

import connectdb from './src/models/index.js';



connectdb()