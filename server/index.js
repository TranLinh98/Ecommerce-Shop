import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.js';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';

// config
dotenv.config({ path: './config.env' });

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//connect Database
connectDb();

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//api routes
routes(app);

// Middleware for Errors
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running with port: ${process.env.PORT}`);
});
