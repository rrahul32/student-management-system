import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';
import 'reflect-metadata';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
