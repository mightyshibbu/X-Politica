import mongoose from 'mongoose';
const { Schema } = mongoose;

const HashmapSchema = new Schema({
  electionRecordId: {
    type: String,
    required: true
  },
  hashmap: {
    type: Map,
    of: new Schema({
      votes: { type: Number, default: 0 },
      totalVotes: { type: Number, default: 0 }
    }, { _id: false }),
    default: {}
  }
});

const Hashmap = mongoose.model('Hashmap', HashmapSchema);
export default Hashmap;