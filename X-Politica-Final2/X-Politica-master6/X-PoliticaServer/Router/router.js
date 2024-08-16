import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Leader from '../models/Leader.js';
import Citizen from '../models/Citizen.js';
import Claim from '../models/Claim.js';
import Admin from '../models/Admin.js';
import ElectionRecord from '../models/ElectionRecord.js';
import Party from '../models/Party.js';
import Hashmap from '../models/ElectionHashMap.js';
import { body, validationResult }  from 'express-validator';
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
    res.status(200).json({ message: 'Logged in successfully!',admin:admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
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

//Get all citizen
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
router.put('/leader/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find and update the Leader by id
    const leader = await Leader.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true // Validate the data before updating
    });

    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    res.json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all Election Records
router.get('/getAllElectionRecords', async (req, res) => {
  try {
    const records = await ElectionRecord.find({ winner: null }).exec();
    res.json(records);
  } catch (error) {
    console.error('Error fetching election records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Election Declare
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
  console.log(req.body); 
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
    // Find the election record
    const electionRecord = await ElectionRecord.findOne({ post, year }).exec();
    if (!electionRecord) {
      return res.status(404).json({ message: 'Election record not found' });
    }

    const { _id: electionRecordId, competingCandidates } = electionRecord;

    // Find the leader
    const leader = await Leader.findOne({ name: leaderName }).exec();
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    const { party: partyName } = leader;

    // Find the party
    const party = await Party.findOne({ name: partyName }).exec();
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    const partyId = party._id.toString();

    // Find or create the hashmap
    let existingHashmap = await Hashmap.findOne({ electionRecordId }).exec();
    if (!existingHashmap) {
      // Initialize hashmap for a new record
      existingHashmap = new Hashmap({
        electionRecordId,
        hashmap: new Map()
      });

      // Initialize hashmap for all competing candidates
      competingCandidates.forEach(candidateId => {
        existingHashmap.hashmap.set(candidateId.toString(), {
          votes: 0,
          totalVotes: 1
        });
      });

      // Initialize hashmap for the party
      existingHashmap.hashmap.set(partyId, {
        votes: 1,
        totalVotes: 1
      });

      await existingHashmap.save();
    } else {
      // Update existing hashmap
      const partyData = existingHashmap.hashmap.get(partyId) || { votes: 0, totalVotes: 1 };
      partyData.votes += 1;
      partyData.totalVotes += 1;
      existingHashmap.hashmap.set(partyId, partyData);

      // Update total votes for all candidates
      const updatedTotalVotes = partyData.totalVotes;
      existingHashmap.hashmap.forEach((value, key) => {
        if (key !== partyId) {
          value.totalVotes = updatedTotalVotes;
          existingHashmap.hashmap.set(key, value);
        }
      });

      await existingHashmap.save();
    }

    res.status(200).json({ message: 'Hashmap updated successfully' });
  } catch (error) {
    console.error('Error updating hashmap:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Declaring Election winner
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

    const electionRecordId = electionRecord._id; // Make sure this matches your schema
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

//Get a party Details
router.get('/parties', async (req, res) => {
  try {
    const parties = await Party.find().populate('partyMembers').exec();
    res.json(parties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching parties' });
  }
});

// Get Election Record details based on party ID
router.get('/elections/party/:id', async (req, res) => {
  try {
    const partyId = req.params.id;
    const elections = await ElectionRecord.find({
      $or: [
        { competingCandidates: partyId },
        { winner: partyId }
      ]
    }).populate('competingCandidates').populate('winner').exec();
    res.json(elections);
  } catch (err) {
    console.error('Error fetching elections:', err); // Detailed logging
    res.status(500).json({ message: 'Error fetching elections', error: err.message });
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


router.get('/getBestLeaders', async (req, res) => {
  try {
    const leaders = await Leader.find().exec(); // Find all leaders
    console.log("leaders: ",leaders);

    const maxApprovedClaimsLeaders = [];

    for (let leader of leaders) {
      console.log("leader: ",)
      const leaderId = leader.aadhaarNumber; 
      const claims = await Claim.find({ leaderId }).exec(); // Find all claims for the current leader
      console.log("claims: ",claims)
      let maxApprovedClaims = 0;

      for (let claim of claims) {
        const approvedCount = claim.citizensApproved.length; // Use the length of the citizensApproved array
        console.log("ApprovedCount: ",approvedCount)
        maxApprovedClaims += approvedCount;
      }
      console.log("maxApprovedClaims: ",maxApprovedClaims)

      maxApprovedClaimsLeaders.push({ leader, maxApprovedClaims });
    }

    maxApprovedClaimsLeaders.sort((a, b) => b.maxApprovedClaims - a.maxApprovedClaims); // Sort the leaders by max approved claims in descending order
    const top6Leaders = maxApprovedClaimsLeaders.slice(0, 6); // Get the top 6 leaders

    res.json(top6Leaders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching leaders with max approved claims' });
  }
});
// router.get('/getBestLeaders', async (req, res) => {
//   try {
//     // Find all leaders
//     const leaders = await Leader.find().exec();
//     console.log("HELLO BACCHO");

//     // Prepare an array to hold leaders and their approved claims count
//     const maxApprovedClaimsLeaders = [];

//     // Iterate over each leader
//     for (const leader of leaders) {
//       // Find all claims associated with the current leader
//       const claims = await Claim.find({ leaderId: leader._id }).exec();
//       let maxApprovedClaims = 0;

//       // Iterate over each claim to count approved claims
//       for (let claim of claims) {
//         const citizensApproved = await Citizen.find({ claims: claim._id, status: 'approved' }).exec();
//         maxApprovedClaims += citizensApproved.length;
//       }

//       // Add the leader and their max approved claims to the array
//       maxApprovedClaimsLeaders.push({ leader, maxApprovedClaims });
//     }

//     // Sort leaders by max approved claims in descending order
//     maxApprovedClaimsLeaders.sort((a, b) => b.maxApprovedClaims - a.maxApprovedClaims);

//     // Get the top 6 leaders
//     const top6Leaders = maxApprovedClaimsLeaders.slice(0, 6);

//     // Send the response
//     res.json(top6Leaders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching leaders with max approved claims' });
//   }
// });

router.get('/citizen/:id', async (req, res) => {
  try {
    console.log("INSIDE GET citixn/:id api")
    const user = await Citizen.findById(req.params.id);
    console.log('INSINDE user: ',user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User Profile
router.put('/citizen/:id', async (req, res) => {
  try {
    console.log("INSIDE citixn/:id api")
    const updatedUser = await Citizen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
