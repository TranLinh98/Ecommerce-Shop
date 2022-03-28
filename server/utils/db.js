import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const DB = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connect successfully !');
  } catch (error) {
    console.log('Connect fail !');
    process.exit(1);
  }
};

export default connectDb;
