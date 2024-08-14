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
import Admin from '../models/Admin.js';
import ElectionRecord from '../models/ElectionRecord.js';
import Party from '../models/Party.js';
import Hashmap from '../models/ElectionHashMap.js';
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

//Admin Login 
router.post('/adminL', async (req, res) => {
  const { name, password } = req.body;
  try {
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    // Check password (assuming you have a comparePassword method in Admin)
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json({ message: 'Logged in successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Get all Citizens
router.get('/getAllCitizens', async (req, res) => {
  try {
    const citizens = await Citizen.find({});
    res.status(200).json(citizens);
  } catch (error) {
    console.error('Error fetching citizens:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Get all Leaders
router.get('/getAllLeaders', async (req, res) => {
  try {
    const leaders = await Leader.find({});
    res.status(200).json(leaders);
  } catch (error) {
    console.error('Error fetching leaders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Get all Election Records
router.get('/getAllElectionRecords', async (req, res) => {
  try {
    const records = await ElectionRecord.find({ winner: null }).exec(); // Query to find records where winner is null
    res.json(records);
  } catch (error) {
    console.error('Error fetching election records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Get all leaders for a particular district(Area)
router.get('/leaders/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const leaders = await Leader.find({ district: city });
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Declare Election
router.post('/electionDeclare', async (req, res) => {
  const { post, year, region } = req.body;
  try {
    const newElection = new ElectionRecord({
      post,
      year,
      region,
      competingCandidates: [],
      winner: null, 
    });
    const savedElection = await newElection.save();
    res.status(201).json(savedElection);
  } catch (error) {
    console.error('Error declaring election:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Election Register
router.post('/Electionregister', async (req, res) => {
  const { leaderName, area, post, year } = req.body;
  try {
    // Find the leader by name and area
    const leader = await Leader.findOne({ name: leaderName}).exec();
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    
    // Find the party by name
    const party = await Party.findOne({ name: leader.party }).exec();
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    
    // Check if an ElectionRecord already exists with the same post, year, and region
    let electionRecord = await ElectionRecord.findOne({ post, year, region: area }).exec();

    if (electionRecord) {
      // Update the existing ElectionRecord by adding the party._id to competingCandidates
      if (!electionRecord.competingCandidates.includes(party._id)) {
        electionRecord.competingCandidates.push(party._id);
        await electionRecord.save();
      }
      res.status(200).json({ message: 'Election record updated successfully', electionRecord });
    } else {
      res.status(201).json({ message: 'Election record does not exist'});
    }
  } catch (error) {
    console.error('Error registering election:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Citizen vote
router.post('/vote', [
  body('post').isString().trim().escape(),
  body('year').isNumeric().toInt(),
  body('leaderName').isString().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid data', errors: errors.array() });
  }

  const { post, year, leaderName } = req.body;
  try {
    // Validate and sanitize request data
    const electionRecord = await ElectionRecord.findOne({ post, year });
    if (!electionRecord) {
      return res.status(404).json({ message: 'Election record not found' });
    }
    const { eid: electionRecordId, competingCandidates } = electionRecord;

    const leader = await Leader.findOne({ name: leaderName });
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    const { party: partyName } = leader;

    const party = await Party.findOne({ name: partyName });
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    const partyId = party._id.toString();

    let existingHashmap = await Hashmap.findOne({ electionRecordId });

    if (!existingHashmap) {
      existingHashmap = new Hashmap({
        electionRecordId,
        hashmap: {}
      });

      competingCandidates.forEach(candidateId => {
        existingHashmap.hashmap.set(candidateId.toString(), {
          votes: 0,
          totalVotes: 1
        });
      });

      existingHashmap.hashmap.set(partyId, {
        votes: 0,
        totalVotes: 1
      });

      await existingHashmap.save();
    } else {
      competingCandidates.forEach(candidateId => {
        if (!existingHashmap.hashmap.has(candidateId.toString())) {
          existingHashmap.hashmap.set(candidateId.toString(), {
            votes: 0,
            totalVotes: existingHashmap.hashmap.size > 0 ? 
              Array.from(existingHashmap.hashmap.values())[0].totalVotes : 1
          });
        }
      });

      if (!existingHashmap.hashmap.has(partyId)) {
        existingHashmap.hashmap.set(partyId, {
          votes: 0,
          totalVotes: existingHashmap.hashmap.size > 0 ? 
            Array.from(existingHashmap.hashmap.values())[0].totalVotes : 1
        });
      }

      const partyCurrent = existingHashmap.hashmap.get(partyId) || {
        votes: 0,
        totalVotes: 1
      };
      partyCurrent.votes += 1;
      const updatedTotalVotes = partyCurrent.totalVotes + 1;

      existingHashmap.hashmap.set(partyId, {
        votes: partyCurrent.votes,
        totalVotes: updatedTotalVotes
      });

      existingHashmap.hashmap.forEach((value, key) => {
        value.totalVotes = updatedTotalVotes;
        existingHashmap.hashmap.set(key, value);
      });

      await existingHashmap.save();
    }
    res.status(200).json({ message: 'Hashmap updated successfully' });
  } catch (error) {
    console.error('Error updating hashmap:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  Declaring winner
router.post('/declareWinner', [
  body('post').isString().trim().escape(),
  body('year').isNumeric().toInt(),
  body('region').isString().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid data', errors: errors.array() });
  }

  const { post, year, region } = req.body;
  try {
    const electionRecord = await ElectionRecord.findOne({ post, year, region }).populate('competingCandidates');

    if (!electionRecord) {
      return res.status(404).json({ message: 'Election record not found' });
    }

    const electionRecordId = electionRecord.eid;
    const hashmap = await Hashmap.findOne({ electionRecordId });

    if (!hashmap) {
      return res.status(404).json({ message: 'Hashmap not found for electionRecordId' });
    }

    let maxVotes = -1;
    let winnerId = null;

    for (const [id, data] of hashmap.hashmap) {
      if (data.votes > maxVotes) {
        maxVotes = data.votes;
        winnerId = id;
      }
    }
    if (!winnerId) {
      return res.status(404).json({ message: 'No candidates found' });
    }

    const winnerParty = await Party.findById(winnerId);

    if (!winnerParty) {
      return res.status(404).json({ message: 'Winner party not found' });
    }
    electionRecord.winner = winnerId;
    await electionRecord.save();

    res.status(200).json({ message: 'Winner declared successfully', winnerName: winnerParty.name });
  } catch (error) {
    console.error('Error declaring winner:', error);
    res.status(500).json({ message: 'Internal server error' });
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
