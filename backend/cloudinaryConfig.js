import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

// Cloudinary configuration function
const configureCloudinary = (cloudName, apiKey, apiSecret) => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

// Define your Cloudinary credentials
const CLOUDINARY_NAME = "dyzcloigq";
const CLOUDINARY_API_KEY = "249382495499818";
const CLOUDINARY_API_SECRET = "pKSpaGBQOCsZg1D1L46bpLwNpa8";

// Initialize Cloudinary configuration with the provided credentials
configureCloudinary(CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET);

export { configureCloudinary, cloudinary };
