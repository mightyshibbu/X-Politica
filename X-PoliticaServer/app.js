import express from 'express';
import cors from 'cors';
import router from './Router/router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
}));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/TEST', {
      ssl: false,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
connectDB();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use(router);

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});