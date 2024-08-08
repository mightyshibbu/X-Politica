import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Leader from '../models/Leader.js';
import Citizen from '../models/Citizen.js';
import Claim from '../models/Claim.js';

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware to ensure a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect('/'); // Redirect to home or login page
  }
};

router.post('/citizenSignup', async (req, res) => {
  try {
    const { name, email, password, phone, state, district, area, aadhaarNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Citizen({ name, email, password: hashedPassword, phone, state, district, area, aadhaarNumber });
    const person = await user.save();
    req.session.user = person; // Store user in session
    res.status(200).json({ message: 'Citizen created successfully', user: person });
  } catch (err) {
    console.error(err);
    res.status(500).json("Citizen NOT created");
  }
});

router.post('/leaderSignup', async (req, res) => {
  try {
    const { name, party, aadhaarNumber, area, district, phone, email, password, role } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const leaderuser = new Leader({ name, party, aadhaarNumber, area, district, phone, email, password: hashedPassword, role });
    const newLeader = await leaderuser.save();
    req.session.user = newLeader; // Store user in session
    res.status(200).json({ message: 'Leader created successfully', user: newLeader });
  } catch (err) {
    console.error(err);
    res.status(500).json("Leader NOT created");
  }
});

router.post('/loginC', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Citizen.findOne({ email }).exec();

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.user = user; // Store user in session on server
        res.status(200).json({ message: 'Login successful', data:user});
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/loginL', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Leader.findOne({ email }).exec();

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.user = user; // Store user in session on server
        res.status(200).json({ message: 'Login successful', data:user});
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Protected route with authentication check
router.post('/newclaim', isAuthenticated, async (req, res) => {
  try {
    const { leaderId, title, description, state, district, area } = req.body;
    if (!leaderId || !title || !description || !state || !district || !area) {
      return res.status(400).json({ message: "Input error: Database declined your input" });
    }
    const claim = new Claim({ leaderId, title, description, state, district, area });
    const savedClaim = await claim.save();
    res.status(201).json({ message: "Claim added successfully!", claim: savedClaim });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ message: "Server error: Unable to save claim" });
  }
});

// Route for logging out and destroying the session
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clears the session ID cookie
    res.status(200).json({ message: 'Logout successful' });
  });
});

export default router;
