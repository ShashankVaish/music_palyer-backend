import mongoose,{Schema} from "mongoose";
const videoschema = new Schema({
    video:{
        type:String,
        required:true,
        lowercase:true,

    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,

        required:true

    },
    duration:{
        type:Number,
        required:true
    
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true
    },

},
{
    timestamps:true
})
export const Video = mongoose.model('Video',videoschema)