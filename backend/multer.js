import multer from 'multer';
import path from 'path';

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Save file with a unique name
  }
});

const upload = multer({ storage });

export default upload;
