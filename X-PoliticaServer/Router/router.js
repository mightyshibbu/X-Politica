// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import Leader from '../models/Leader.js';
// import Citizen from '../models/Citizen.js';
// import Claim from '../models/Claim.js';
// // import session from 'express-session';

// const router = express.Router();
// import dotenv from 'dotenv';
// const jwtSecretKey = process.env.JWT_SECRET_KEY;
// dotenv.config();


// // Middleware to ensure a user is authenticated
// const isAuthenticated = (req, res, next) => {
//   // console.log('Session in isAuthenticated:', req.session);
//   // console.log(req.session.user);
//   if (req.session.user) {
//     console.log("INSIDE isAuthenticated if block")
//     return next();
//   } else {
//     console.log("INSIDE isAuthenticated else block")
//     return res.redirect('/'); // Redirect to home or login page
//   }
// };

// router.post('/citizenSignup', async (req, res) => {
//   try {
//     const { name, email, password, phone, state, district, area, aadhaarNumber } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new Citizen({ name, email, password: hashedPassword, phone, state, district, area, aadhaarNumber });
//     const person = await user.save();
//     req.session.user = person; // Store user in session
//     res.status(200).json({ message: 'Citizen created successfully', user: person });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("Citizen NOT created");
//   }
// });

// router.post('/leaderSignup', async (req, res) => {
//   try {
//     const { name, party, aadhaarNumber, area, district, phone, email, password, role } = req.body;

//     if (!password) {
//       return res.status(400).json({ message: 'Password is required' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const leaderuser = new Leader({ name, party, aadhaarNumber, area, district, phone, email, password: hashedPassword, role });
//     const newLeader = await leaderuser.save();
//     req.session.user = newLeader; // Store user in session
//     res.status(200).json({ message: 'Leader created successfully', user: newLeader });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("Leader NOT created");
//   }
// });

// router.post('/loginC', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Citizen.findOne({ email }).exec();

//     if (user) {
//       const match = await bcrypt.compare(password, user.password);
//       if (match) {
//         req.session.user = user; // Store user in session on server
//         res.status(200).json({ message: 'Login successful', data:user});
//       } else {
//         res.status(401).json({ message: 'Invalid password' });
//       }
//     } else {
//       res.status(401).json({ message: 'Invalid email' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.post('/loginL', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Leader.findOne({ email }).exec();

//     if (user) {
//       const match = await bcrypt.compare(password, user.password);
//       if (match) {
//         // req.session.user = user; // Store user in session on server
//         // console.log('IN LOGIN LEADER: Session in isAuthenticated:', req.session);
//         const token = jwt.sign({ aadhaarNumber:user.aadhaarNumber, userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//         console.log("token loginL : " , token);
        
//         res.status(200).json({ message: 'Login successful', data:user,token:token });
//       } else {
//         res.status(401).json({ message: 'Invalid password' });
//       }
//     } else {
//       res.status(401).json({ message: 'Invalid email' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.post('/newclaim', async (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     // const token = auth.split(" ")[1]
//     console.log('Token newClaims :',token)
   
//     const decoded = jwt.verify(token, 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
//     console.log('Decode:',decoded)
//     if (decoded) {
//       console.log("in decoded");
//       // const aadhaarNumber = decoded.aadhaarNumber
//       // console.log("adh ", aadhaarNumber);
      
//       // Use the decoded data to authenticate the user
//       const user = await Leader.findById(decoded.userId).exec();
//       console.log("if user " , user);
//       if (user) {
//         // Allow access to the protected resource

//         const { leaderId, title, description, state, district, area } = req.body;
//         const claim = new Claim({ leaderId, title, description, state, district, area });
//         const savedClaim = await claim.save();
//         res.json({ message: 'Claim added successfully!', claim: savedClaim });
//       } else {
//         res.status(401).json({ message: 'Invalid token' });
//       }
//     } else {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// router.get('/myclaims', async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; // Assumes Bearer token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const leaderId = decoded.leaderId;

//     const claims = await Claim.find({ leaderId });
//     res.status(200).json(claims);
//   } catch (error) {
//     console.error('Error fetching claims:', error);
//     res.status(500).json({ message: 'Server error: Unable to fetch claims' });
//   }
// });
// //MERA CODE
// // Protected route with authentication check
// // router.post('/newclaim', isAuthenticated, async (req, res) => {
// //   try {
// //     console.log("INSIDE /newclaim try block")
// //     const { leaderId, title, description, state, district, area } = req.body;
// //     console.log(leaderId);
// //     console.log(title);
// //     console.log(description);
// //     console.log(state);
    
// //     if (!leaderId || !title || !description || !state || !district || !area) {
// //       return res.status(400).json({ message: "Input error: Database declined your input" });
// //     }
// //     const claim = new Claim({ leaderId, title, description, state, district, area });
// //     console.log("INSIDE /newclaim block:",claim)
// //     const savedClaim = await claim.save();
// //     res.status(201).json({ message: "Claim added successfully!", claim: savedClaim });
// //   } catch (error) {
// //     console.error('Error creating claim:', error);
// //     res.status(500).json({ message: "Server error: Unable to save claim" });
// //   }
// // });

// // Route for logging out and destroying the session
// router.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       return res.status(500).json({ message: 'Logout failed' });
//     }
//     res.clearCookie('connect.sid'); // Clears the session ID cookie
//     res.status(200).json({ message: 'Logout successful' });
//   });
// });

// export default router;
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
  console.log("INSIDE isAuthentication/ token:",token)
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

// Citizen Signup Route
router.post('/citizenSignup', async (req, res) => {
  try {
    const { name, email, password, phone, state, district, area, aadhaarNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Citizen({ name, email, password: hashedPassword, phone, state, district, area, aadhaarNumber });
    const savedUser = await user.save();
    console.log("savedUser:",savedUser);
    const token = jwt.sign({ userId: savedUser._id, email: savedUser.email, user:savedUser }, jwtSecretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Citizen created successfully', data:savedUser,user: savedUser, token:token});
  } catch (err) {
    console.error(err);
    res.status(500).json("Citizen NOT created");
  }
});

// Leader Signup Route
router.post('/leaderSignup', async (req, res) => {
  try {
    const { name, party, aadhaarNumber, area, district, phone, email, password, role } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const leaderUser = new Leader({ name, party, aadhaarNumber, area, district, phone, email, password: hashedPassword, role });
    const savedLeader = await leaderUser.save();

    const token = jwt.sign({ userId: savedLeader._id, email: savedLeader.email, user:savedLeader }, jwtSecretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Leader created successfully', data: savedLeader, token:token });
  } catch (err) {
    console.error(err);
    res.status(500).json("Leader NOT created");
  }
});

// Citizen Login Route
router.post('/loginC', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Citizen.findOne({ email }).exec();

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id, email: user.email, user:user }, jwtSecretKey, { expiresIn: '1h' });
        console.log("TESTINGGGGGG: ",user);
        res.status(200).json({ message: 'Login successful', data: user, token:token });
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
        const token = jwt.sign({ userId: user._id, email: user.email, aadhaarNumber: user.aadhaarNumber , user:user}, jwtSecretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', data: user, token });
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
router.post('/newclaim', isAuthenticated, async (req, res) => {
  try {
    const {leaderId, title, description, state, district, area, activeStatus } = req.body;
    console.log("INSIDE /newclaim",req.body)
    const claim = new Claim({ leaderId, title, description, state, district, area,activeStatus });
    const savedClaim = await claim.save();
    console.log("savedClaim: ",savedClaim)
    res.status(201).json({ message: 'Claim added successfully!', claim: savedClaim });
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
    console.log("ARHHHHHHHHHHHHHHHHHHHHHHHH",leaderId)
    const claims = await Claim.find({leaderId}).exec();

    if (!claims) {
      return res.status(404).JSON({ message: 'No claims found' });
    }
    console.log("claims: ",claims)
    res.status(201).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error: Unable to fetch claims' });
  }
});
// Get Claims Route (Protected with JWT)
router.get('/activeclaims', async (req, res) => {
  try {
    console.log("INSIDE Active claims")
    const activeStatus='ACTIVE'
    const activeclaims = await Claim.find({activeStatus}).exec();

    if (!activeclaims) {
      return res.status(404).JSON({ message: 'No claims found' });
    }
    console.log("activeclaims: ",activeclaims)
    res.status(201).json(activeclaims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error: Unable to fetch activeclaims' });
  }
});


// Logout Route
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
