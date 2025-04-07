import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



// import the route from routes 
import { Router } from "express"
app.use('/users',)
export {app}