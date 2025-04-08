import {v2 as cloudinary} from cloudinary
import {fs} from fs
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const uploadFileCloudinary = async (filepath)=>{
    if(!filepath) return null
    try {
        const response = await cloudinary.uploader
        .upload(filepath,{
            resource_type: "auto"
        })
        fs.unlinkSync(filepath)
        console.log("the file is upload in the cloudinary server ",response)
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log("file is deleted")



        
    }
    
}
export {uploadFileCloudinary}