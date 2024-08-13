import express from 'express';
import bcrypt from 'bcryptjs';
import Leader from '../models/Leader.js';
import jwt from 'jsonwebtoken';
import Citizen from '../models/Citizen.js';
import bodyParser from 'body-parser';
import Admin from '../models/Admin.js';
import ElectionRecord from '../models/ElectionRecord.js'
import Party from '../models/Party.js';
import Hashmap from '../models/ElectionHashMap.js'
const app = express();
app.use(bodyParser.json());
const router = express.Router();
router.use(express.json());
const jwtSecretKey = process.env.JWT_SECRET_KEY;
// Basic home route for the API
// router.get('/', (_req, res) => {
//   res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication');
// });

router.post('/citizenSignup', async (req, res) => {
  try {
    const { name, email, password, phone, state, district, area, aadhaarNumber } = req.body;
    console.log(JSON.stringify(req.body));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Citizen({ name, email, password: hashedPassword, phone, state, district, area, aadhaarNumber });

    const person = await user.save();
    res.status(200).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json("Citizen NOT created");
  }
});

router.post('/adminSignup', async (req, res) => {
  const { name, password } = req.body;

  // Basic validation
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }
  try {
    const newAdmin = new Admin({ name, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin account created successfully!' });
  } catch (error) {
    console.error('Error creating admin account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/leaderSignup', async (req, res) => {
  try {
    const { name, party, aadhaarNumber, area, district, phone, email, password, role } = req.body;
    // Check if the password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new leader
    const leaderuser = new Leader({ name, party, aadhaarNumber, area, district, phone, email,
                                    password: hashedPassword, role});
    // Save the new leader
    const newLeader = await leaderuser.save();

    // Check if the party exists
    const existingParty = await Party.findOne({ name: party });
    if (existingParty) {
      existingParty.partyMembers.push(newLeader._id);
      await existingParty.save();
    }
    res.status(200).json(newLeader);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Leader NOT created" });
  }
});

router.post('/partySignup', async (req, res) => {
  try {
    const { name, yearEstablished, currentHeads } = req.body;
    if (!name || !yearEstablished || !currentHeads) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Find leaders associated with the party name
    const leaders = await Leader.find({ party: name }).select('_id');

    // Create a new party
    const newParty = new Party({
      name,
      yearEstablished,
      currentHeads,
      partyMembers: leaders.map(leader => leader._id) // Add leader IDs to the party
    });
    await newParty.save();
    res.status(201).json(newParty);
  } catch (error) {
    console.error('Error creating party:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/loginC', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Citizen.findOne({ email }).exec();

    if (user) {
      console.log('Stored hashed password:', user.password);
      console.log('Provided password:', password);

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json(user);
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


router.post('/loginL', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Leader.findOne({ email }).exec();

    if (user) {
      console.log('Stored hashed password:', user.password);
      console.log('Provided password:', password);

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json(user);
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

router.get('/getAllCitizens', async (req, res) => {
  try {
    const citizens = await Citizen.find({});
    res.status(200).json(citizens);
  } catch (error) {
    console.error('Error fetching citizens:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getAllLeaders', async (req, res) => {
  try {
    const leaders = await Leader.find({});
    res.status(200).json(leaders);
  } catch (error) {
    console.error('Error fetching leaders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/leaders/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const leaders = await Leader.find({ district: city });
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/getAllElectionRecords', async (req, res) => {
  try {
    const records = await ElectionRecord.find({ winner: null }).exec(); // Query to find records where winner is null
    res.json(records);
  } catch (error) {
    console.error('Error fetching election records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/vote', async (req, res) => {
  const { post, year, leaderName } = req.body;
  try {
    // Validate request data
    if (!post || !year || !leaderName) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Find the election record for the given post and year
    const electionRecord = await ElectionRecord.findOne({ post, year });
    if (!electionRecord) {
      return res.status(404).json({ message: 'Election record not found' });
    }
    const { eid: electionRecordId, competingCandidates } = electionRecord;

    // Find the leader by name and get the party information
    const leader = await Leader.findOne({ name: leaderName });
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    const { party: partyName } = leader;

    // Find the party by name
    const party = await Party.findOne({ name: partyName });
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    const partyId = party._id.toString(); // Ensure the party ID is a string

    // Find or create the hashmap for the election record
    let existingHashmap = await Hashmap.findOne({ electionRecordId });

    if (!existingHashmap) {
      // Create a new hashmap and initialize it
      existingHashmap = new Hashmap({
        electionRecordId,
        hashmap: {}
      });

      // Initialize the hashmap with all candidate IDs and the party ID
      competingCandidates.forEach(candidateId => {
        existingHashmap.hashmap.set(candidateId.toString(), {
          votes: 0,
          totalVotes: 1 // Initialize totalVotes to 1 for new records
        });
      });

      // Initialize the party ID in the hashmap
      existingHashmap.hashmap.set(partyId, {
        votes: 0,
        totalVotes: 1 // Initialize totalVotes to 1 for new records
      });

      await existingHashmap.save();
    } else {
      // Ensure all candidates and the party are present in the hashmap
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

      // Increment votes and totalVotes for the party
      const partyCurrent = existingHashmap.hashmap.get(partyId) || {
        votes: 0,
        totalVotes: 1
      };
      partyCurrent.votes += 1; // Increment party votes
      const updatedTotalVotes = partyCurrent.totalVotes + 1; // Increment totalVotes

      existingHashmap.hashmap.set(partyId, {
        votes: partyCurrent.votes,
        totalVotes: updatedTotalVotes
      });

      // Update totalVotes for all candidates to be consistent
      existingHashmap.hashmap.forEach((value, key) => {
        value.totalVotes = updatedTotalVotes;
        existingHashmap.hashmap.set(key, value);
      });
      console.log('Hashmap before save:', Array.from(existingHashmap.hashmap.entries()));
      await existingHashmap.save();
    }
    res.status(200).json({ message: 'Hashmap updated successfully' });
  } catch (error) {
    console.error('Error updating hashmap:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/declareWinner', async (req, res) => {
  const { post, year, region } = req.body;
  try {
      // Debugging: Log received data
      console.log('Received data:', { post, year, region });

      // Find the ElectionRecord based on post, year, and region
      const electionRecord = await ElectionRecord.findOne({ post, year, region }).populate('competingCandidates');

      if (!electionRecord) {
          console.log('Election record not found');
          return res.status(404).json({ message: 'Election record not found' });
      }

      const electionRecordId = electionRecord.eid;
      console.log('Found ElectionRecord:', electionRecord);

      // Fetch the hashmap for the specific election record ID
      const hashmap = await Hashmap.findOne({ electionRecordId });

      if (!hashmap) {
          console.log('Hashmap not found for electionRecordId:', electionRecordId);
          return res.status(404).json({ message: 'Hashmap not found' });
      }

      console.log('Hashmap data:', hashmap);

      // Determine the candidate with the highest votes
      let maxVotes = -1;
      let winnerId = null;

      for (const [id, data] of hashmap.hashmap) {
          console.log('Checking candidate ID:', id, 'with votes:', data.votes);
          if (data.votes > maxVotes) {
              maxVotes = data.votes;
              winnerId = id;
          }
      }
      if (!winnerId) {
          console.log('No winner determined');
          return res.status(404).json({ message: 'No candidates found' });
      }
      console.log('Winner candidate ID:', winnerId);

      // Find the party corresponding to the winner ID
      const winnerParty = await Party.findById(winnerId);

      if (!winnerParty) {
          console.log('Winner party not found for ID:', winnerId);
          return res.status(404).json({ message: 'Winner party not found' });
      }
      // Update the ElectionRecord with the winner
      electionRecord.winner = winnerId;
      await electionRecord.save();

      console.log('Winner declared successfully:', winnerParty.name);
      res.status(200).json({ message: 'Winner declared successfully', winnerName: winnerParty.name });

  } catch (error) {
      console.error('Error declaring winner:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




// The auth endpoint that creates a new user record or logs a user based on an existing record
router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  // Look up the user entry in the database
  const user = await Citizen.findOne({ email }).exec();

  if (user) {
    // If user is found, compare the hashed passwords and generate the JWT token for the user
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ email, signInTime: Date.now() }, jwtSecretKey);
    return res.status(200).json({ message: 'success', token });
  } else {
    // return res.status(401).json({ message: 'no  user found' });
    // If no user is found, hash the given password and create a new entry in the auth db
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email, signInTime: Date.now() }, jwtSecretKey);
    return res.status(200).json({ message: 'uccess', token });
  }
});

// The verify endpoint that checks if a given JWT token is valid
router.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey.toLowerCase()];

  if (!authToken) {
    return res.status(401).json({ status: 'invalid auth', message: 'No token provided' });
  }

  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    return res.status(200).json({ status: 'logged in', message: 'uccess', data: verified });
  } catch (error) {
    return res.status(401).json({ status: 'invalid auth', message: 'error' });
  }
});

// An endpoint to see if there's an existing account for a given email address
router.post('/check-account', async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email }).exec();

  res.status(200).json({
    status: user? 'User exists' : 'User does not exist',
    userExists:!!user,
  });
});


export default router;