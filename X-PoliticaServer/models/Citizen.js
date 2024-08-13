import mongoose from 'mongoose';

const CitizenSchema = new mongoose.Schema({
  name:{ 
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    required: false,
    default: 'citizen',
  },
  phone: {
    type: String,
    required: true,
  },
  approvedList:{
    type: Array,
    requied:false,
    default:[]
  },
  deniedList:{
    type: Array,
    requied:false,
    default:[]
  }
});

const Citizen = mongoose.model('Citizen', CitizenSchema);

export default Citizen;