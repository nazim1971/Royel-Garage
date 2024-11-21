import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const uri = process.env.DATABASE_URI as string;

 const connectDB = async () => {
  try {
    if (!uri) {
        throw new Error('MongoDB URI is not defined in the environment variables');
      }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error instanceof Error ? error.stack : error);

  }
};



export default {
  port: process.env.PORT,
  connectDB,
};
