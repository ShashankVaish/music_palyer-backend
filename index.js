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
dotenv.config();

import connectdb from './src/db/index.js';
import { app } from './src/app.js';


console.log("Current working directory:", process.cwd());
connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("the port is listening on the")
    })

})
.catch((err)=>{
    console.log(`cannot connect to database ${err}`)
})