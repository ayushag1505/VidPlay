import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' ;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null ;

        // Upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'auto'
        })

        // File has been uploaded
        console.log("File Uploaded Successfully " , res.url) ;
        return res ;
    } catch (error) {
        // remove the locally saved temp file as uploading was not successful
        fs.unlinkSync(localFilePath) ;
        return null ;
    }
}

export { uploadOnCloudinary }
    
