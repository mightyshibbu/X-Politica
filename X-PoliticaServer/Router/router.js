import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Leader from '../models/Leader.js';
import Citizen from '../models/Citizen.js';
import Claim from '../models/Claim.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware to ensure a user is authenticated using JWT
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token
  console.log('INSIDE isAuthentication/ token:', token);
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded; // Attach decoded user data to the request
    console.log('INSIDE is Authenticated try:');
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: Invalid token' });
  }
};

// Citizen Signup Route
router.post('/citizenSignup', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      state,
      district,
      area,
      aadhaarNumber,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Citizen({
      name,
      email,
      password: hashedPassword,
      phone,
      state,
      district,
      area,
      aadhaarNumber,
    });
    const savedUser = await user.save();
    console.log('savedUser:', savedUser);
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email, user: savedUser },
      jwtSecretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Citizen created successfully',
      data: savedUser,
      user: savedUser,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Citizen NOT created');
  }
});

// Leader Signup Route
router.post('/leaderSignup', async (req, res) => {
  try {
    const {
      name,
      party,
      aadhaarNumber,
      area,
      district,
      phone,
      email,
      password,
      role,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const leaderUser = new Leader({
      name,
      party,
      aadhaarNumber,
      area,
      district,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    const savedLeader = await leaderUser.save();

    const token = jwt.sign(
      { userId: savedLeader._id, email: savedLeader.email, user: savedLeader },
      jwtSecretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Leader created successfully',
      data: savedLeader,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Leader NOT created');
  }
});

// Citizen Login Route
router.post('/loginC', async (req, res) => {
  try {
    console.log('TESTING');
    const { email, password } = req.body;
    const user = await Citizen.findOne({ email }).exec();

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { userId: user._id, email: user.email, user: user },
          jwtSecretKey,
          { expiresIn: '1h' }
        );
        console.log('TESTINGGGGGG: ', user);
        res.status(200).json({
          message: 'Login successful',
          data: user,
          token: token,
          user: user,
        });
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

// Leader Login Route
router.post('/loginL', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Leader.findOne({ email }).exec();

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            aadhaarNumber: user.aadhaarNumber,
            user: user,
          },
          jwtSecretKey,
          { expiresIn: '1h' }
        );

        res
          .status(200)
          .json({ message: 'Login successful', data: user, token });
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

// New Claim Route (Protected with JWT)
router.post('/newclaim', async (req, res) => {
  try {
    const {
      leaderId,
      title,
      description,
      state,
      district,
      area,
      activeStatus,
    } = req.body;
    console.log('INSIDE /newclaim', req.body);

    // Calculate the total number of citizens in the area
    console.log("HELLO")
    const totalCitizenUnderArea = await Claim.countDocuments({ area });
    const approvals = 0;
    const denials = 0;
    const validationStatus = false;
    const claim = new Claim({
      leaderId,
      title,
      description,
      state,
      district,
      area,
      activeStatus,
      totalCitizenUnderArea,
      approvals,
      denials,
      validationStatus,
    });
    
    const savedClaim = await claim.save();
    console.log('XXXXXXXXXXXX savedClaim: ', savedClaim);

    res
      .status(201)
      .json({ message: 'Claim added successfully!', claim: savedClaim });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ message: 'Server error: Unable to save claim' });
  }
});

// Backend Route to Fetch Claims Based on Aadhaar Number
// Get Claims Route (Protected with JWT)
router.get('/myclaims/:aadhaarNumber', async (req, res) => {
  try {
    const leaderId = req.params.aadhaarNumber;
    console.log('ARHHHHHHHHHHHHHHHHHHHHHHHH', leaderId);
    const claims = await Claim.find({ leaderId }).exec();
    console.log('claims: ', claims);
    if (!claims) {
      return res.status(404).json({ message: 'No claims found' });
    }
    res.status(201).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error: Unable to fetch claims' });
  }
});
router.get('/pendingclaims/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find claims where the user ID is not in citizensApproved nor citizensDenied arrays and validationStatus is false
    const claims = await Claim.find({
      validationStatus: false,
      citizensApproved: { $ne: userId },  // User ID is not in citizensApproved array
      citizensDenied: { $ne: userId }     // User ID is not in citizensDenied array
    }).exec();

    res.json(claims);
  } catch (error) {
    console.error('Error fetching pending claims:', error);
    res.status(500).json({ message: 'Server error: Unable to fetch pending claims' });
  }
});
router.put('/claims/:claimid/:userId', async (req, res) => {
  try {
    const { updatedFields,approvals} = req.body;
    const { claimid, userId } = req.params;

    console.log('updatedFields: ', updatedFields); 
    console.log('Claim ID: ', claimid);             
    console.log('User ID: ', userId);               

    let updateQuery = {
      ...updatedFields,
    };

    if (updatedFields.approvals) {
      updateQuery.$addToSet = { citizensApproved: userId };
    } else if (updatedFields.denials) {
      updateQuery.$addToSet = { citizensDenied: userId };
    }

    // Update the claim with the provided fields and add userId to the appropriate array
    let updatedClaim = await Claim.findByIdAndUpdate(
      claimid,
      updateQuery,
      { new: true }
    );
    
    if (!updatedClaim) {
      console.log('Claim not found with ID:', claimid);
      return res.status(404).json({ message: 'Claim not found' });
    }
    
    console.log('updatedClaim: ', updatedClaim); 
    res.json(updatedClaim);
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ message: 'Server error: Unable to update claim' });
  }
});


router.put('/citizens/:id', async (req, res) => {
  try {
    const citizenId = req.params.id;
    const { claimId, approved } = req.body;
    console.log("Current url:",req.originalUrl)
    console.log('Inside /UpdateCitizen route');
    console.log('Citizen ID:', citizenId);
    console.log('Claim ID:', claimId);
    console.log('Approved:', approved);

    const update = {
      $addToSet: { [approved ? 'approvedList' : 'deniedList']: claimId },
    };

    const updatedCitizen = await Citizen.findByIdAndUpdate(citizenId, update, {
      new: true,
    });

    if (!updatedCitizen) {
      console.error('No citizen found for ID:', citizenId);
      return res.status(404).json({ message: 'Citizen not found' });
    }

    console.log('Updated Citizen:', updatedCitizen);
    res.json(updatedCitizen);
  } catch (error) {
    console.error('Error updating citizen:', error);
    res.status(500).json({ message: 'Server error: Unable to update citizen' });
  }
});

// Get Claims Route (Protected with JWT)
router.post('/activeclaims', async (req, res) => {
  try {
    console.log('INSIDE Active claims 1');
    // const { email } = req.body;
    console.log('INSIDE Active claims 2');
    const activeStatus = 'ACTIVE';
    const activeclaims = await Claim.find({ activeStatus }).exec();
    // const citizen = await Citizen.findOne({email}).exec();
    if (!activeclaims) {
      return res.status(404).json({ message: 'No claims found' });
    }
    //   let  noResponseClaims=[];
    //   let  noResponseClaims1=[];
    // citizen.approvedList.forEach((e)=>{
    //   noResponseClaims=activeclaims.filter((o)=>o._id==e)
    //   })
    // citizen.deniedList.forEach((e)=>{
    //   noResponseClaims1=noResponseClaims.filter((o)=>o._id==e)
    //   })

    //   console.log('noResponseClaims: ', noResponseClaims1);
    res.status(201).json(activeclaims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res
      .status(500)
      .json({ message: 'Server error: Unable to fetch activeclaims' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clears the session ID cookie
    res.status(200).json({ message: 'Logout successful' });
  });
});

export default router;
