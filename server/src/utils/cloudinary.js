import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload file on cloudinary
        const response = cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        // file has been uploaded successfully
        console.log("File is uploaded on Cloudinary", response)

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // if cloudinary failed then our local saved 
                                    // temporary file will be remove
        return null
    }
}


export {
    uploadOnCloudinay
}