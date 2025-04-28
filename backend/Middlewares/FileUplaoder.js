import multer from "multer";
import { createCloudinaryStorage } from "../storageConfig.js";

const storage = createCloudinaryStorage();
const cloudinaryFileUploader = multer({ storage });

export { cloudinaryFileUploader };
