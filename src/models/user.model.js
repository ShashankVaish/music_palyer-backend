import mongoose,{Schema} from "mongoose";
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
            ref:Video
        }
    ],
    avatar:{
        type:String,


    },
    coverphoto:{
        type:String,

    },


    password:{
        type:String,
        required:true,
        trim:true,
        

    }
    

    
},{
    timestamps:true
})
export const User = mongoose.model('User',userschema)