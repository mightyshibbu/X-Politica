import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import router from './Router/router.js';
import MongoStore from 'connect-mongo'
import jwt from 'jsonwebtoken'
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
const app = express();

// Initialize MongoDB session store
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI, // MongoDB connection URI
  collection: 'sessions',        // Collection to store sessions
});

store.on('error', function(error) {
  console.error(error);
});

// Session middleware
// app.use(session({
//   secret: process.env.JWT_SECRET_KEY,  // A secret key for signing the session ID cookie
//   resave: false,                       // Forces session to be saved back to the store
//   saveUninitialized: false,            // Forces a session that is "uninitialized" to be saved to the store
//   store: store,                        // MongoDB session store
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day in milliseconds
//   }
// }));
app.use(session({
  secret: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // Replace with your DB URI
    collectionName: 'sessions'
  })
}));

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
  credentials: true
}));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      ssl: false,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
connectDB();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use(router);

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
