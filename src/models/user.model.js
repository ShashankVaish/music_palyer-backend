import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userschema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    avatar:{
        type:String,
        required:true
    },
    coverphoto:{
        type:String,

    },
    password:{
        type:String,
        required:true,
        trim:true,
    }
    ,
    RefreshToken:{
        type:String,
        // required:true
    }

},{
    timestamps:true
})
userschema.pre("save", async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await  bcrypt.hash(this.password,10)
    next()
})
userschema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
}
userschema.methods.AcessTokengenerate  = function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        fullname:this.fullname,
        email:this.email,
    },process.env.ACCESS_TOKEN,
    {
        expiresIn: process.env.ACCESS_TOKEN_TIME
    }
)

}
userschema.methods.RefreshTokenGenerate  = function(){
    return sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN,
    {
        expiresIn:process.env.REFRESH_TOKEN_TIME
    }
);
}
userschema.methods.getinfo = function (){
    return{
        username: this.name,
        fullname:this.fullname,
        email:this.email,
        ACCESS_TOKEN:this.ACCESS_TOKEN,
        
    }
}

export const User = mongoose.model('User',userschema)