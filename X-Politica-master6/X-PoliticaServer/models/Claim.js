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
  activeStatus:{
    type: String,
    required: false
  },
  totalCitizenUnderArea:{
    type: Number,
    required: true
  },
  approvals:{
    type: Number,
    required: true
  },
  denials:{
    type: Number,
    required: true  
  },
  validationStatus:{
    type: Boolean,
    required:true
  },
  citizensApproved:{
    type:Array,
    required: false,
    default:[]
  },
  citizensDenied:{
    type:Array,
    required: false,
    default:[]
  }
});

// Create the Claim model
const Claim = mongoose.model('Claim', ClaimSchema);

export default Claim;
