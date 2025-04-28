import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

// Function to create Cloudinary storage for multer
export const createCloudinaryStorage = () => {
  return new CloudinaryStorage({
    cloudinary: cloudinary, // Using the cloudinary instance configured with credentials
    params: {
      folder: "uploads", // Specify the folder for uploads
      format: async (req, file) => "png", // Default format; can be changed based on your requirement
      public_id: (req, file) => file.originalname.split(".")[0], // Use the original filename without extension
    },
  });
};
