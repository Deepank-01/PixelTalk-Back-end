const cloudinary = require('cloudinary').v2
require('dotenv').config()


  const uploadToCloudinary = async (image,height,quality) => {
    try {
        const options={folder:"Chat-app"}
        if(height){
            options.height=height
        }
        if(quality){
            options.quality=quality
        }
        options.resource_type="auto";
      const result = await cloudinary.uploader.upload(image.tempFilePath, options);
      return result.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Failed to upload image");
    }
  };

  module.exports=uploadToCloudinary