import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'toheedxdev', 
    api_key: '933661945493736', 
    api_secret: 'FP8ogHHZK8HpwqImQZvScRP2zHA'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("Try Block Run");
        // file has been uploaded successfully
        console.log("File is uploaded on Cloudinary", response);

        return response;
    } catch (error) {
        console.log("Catch Block Run", error);
        fs.unlinkSync(localFilePath); // if cloudinary failed then our local saved temporary file will be removed
        return null;
    }
};

export {
    uploadOnCloudinary
};
