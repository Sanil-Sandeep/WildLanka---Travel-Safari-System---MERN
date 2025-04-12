import express, { request, response } from "express";
import { PORT, mongoDBURL} from './config.js'; // Ensure the path is correct
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'; // Import path module
import { Record } from "./models/returnModel.js";
import { fileURLToPath } from 'url'; // Import fileURLToPath


import productsRoute from './routes/productsRoute.js';
import paymentsRoutes from './routes/paymentsRoute.js';
import paymentExpensesRoute from './routes/paymentExpensesRoute.js'
import deliverysRoute from './routes/deliverysRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import mChatRoute from './routes/mChatRoute.js';
import cChatRoute from './routes/cChatRoute.js';
import recordRoute from './routes/recordRoute.js';
import packageRoute from './routes/packageRoute.js';
import safariEventRoute from './routes/safariEventRoute.js'

import { configureCloudinary } from "./cloudinaryConfig.js";
import { cloudinaryFileUploader } from "./Middlewares/FileUplaoder.js";

// Get directory name from URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow all origins with Default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
//app.use(
// cors({
//   origin: 'http://localhost:3000',
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//      allowedHeaders: ['Content-Type']
//  })
//);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


 
app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('welcome mern stack')
 });

app.use('/products', productsRoute);
app.use('/payments', paymentsRoutes);
app.use('/expenses', paymentExpensesRoute);
app.use('/deliverys', deliverysRoute);
app.use('/feedbacks', feedbackRoute);
app.use('/mchats', mChatRoute);
app.use('/cchats', cChatRoute);
app.use('/records', recordRoute);
app.use('/packages', packageRoute);
app.use('/events', safariEventRoute);

// Define your Cloudinary credentials here
const CLOUDINARY_NAME = "dyzcloigq";
const CLOUDINARY_API_KEY = "249382495499818";
const CLOUDINARY_API_SECRET = "pKSpaGBQOCsZg1D1L46bpLwNpa8";

// Initialize Cloudinary configuration with values from index.js
configureCloudinary(CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET);

app.post("/upload", cloudinaryFileUploader.single("image"), (req, res) => {
    res.send({ imageUrl: req.file.path });
  });

mongoose
   .connect(mongoDBURL)
   .then(() => {
      console.log('App connected to database');
      app.listen(PORT, () => {
        console.log(`App is listening the port : ${PORT}`); 
    });
   })
   .catch((error) => {
       console.log(error);
   });