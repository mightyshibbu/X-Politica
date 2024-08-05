import mongoose from 'mongoose';

const CitizenSchema = new mongoose.Schema({
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
});

const Citizen = mongoose.model('Citizen', CitizenSchema);

export default Citizen;