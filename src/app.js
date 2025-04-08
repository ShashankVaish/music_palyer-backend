import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// import the route from routes 
import router from "./routes/users.route.js"
app.use('/api/v1/users',router)
export {app}