import express from 'express';
import bcrypt from 'bcryptjs';
import Leader from '../models/Leader.js';
import jwt from 'jsonwebtoken';
import Citizen from '../models/Citizen.js';
import bodyParser from 'body-parser';
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

router.post('/leaderSignup', async (req, res) => {
  try {
    const { name, party, aadhaarNumber, area, district, phone, email, password, role } = req.body;
    // now you can access the variables
    console.log(req.body);
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required',password});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const leaderuser = new Leader({ name, party, aadhaarNumber, area, district, phone, email, password: hashedPassword, role });
    const newLeader = await leaderuser.save();
    res.status(200).json(newLeader);
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