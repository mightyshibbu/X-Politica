import mongoose from 'mongoose';

// Define the Claim schema
const ClaimSchema = new mongoose.Schema({
  leaderId:{
    type: String,
    required: true,
    unique: false
  },
    title: { 
    type: String,
    required: true,
    unique: false
  },
  description: { 
    type: String,
    required: true,
    unique: false
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

// Create the Claim model
const Claim = mongoose.model('Claim', ClaimSchema);

export default Claim;
