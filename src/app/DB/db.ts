import mongoose from 'mongoose';
import config from '../config';

const uri = config.db as string;

if (!uri) {
  throw new Error('MongoDB URI is not defined in the environment variables');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error instanceof Error ? error.stack : error);

  }
};

