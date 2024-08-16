import mongoose from 'mongoose';
const { Schema } = mongoose;

const PartySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    yearEstablished: {
      type: Number,
      required: true,
    },
    currentHeads:{
      type: String,
    },
    partyMembers:[{//array of _id:ObjectId
     type: Schema.Types.ObjectId,
     ref: 'Leader', // Reference to the NationalRecord model
   }],
  });

const Party = mongoose.model('Party', PartySchema);

 export default Party;