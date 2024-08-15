// Leader.js
import mongoose from 'mongoose';

const LeaderSchema = new mongoose.Schema({
  name:{ 
    type: String,
    required: true,
    unique: false
  },
  party: {
    type: String,
    required: true
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Leader'
  }
});

const Leader = mongoose.model('Leader', LeaderSchema);

export default Leader;