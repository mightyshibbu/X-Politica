import mongoose from 'mongoose';
const { Schema } = mongoose;

const ElectionRecordSchema = new mongoose.Schema({
    eid:{
        type: String,
        required:true,
        unique: true,
        default: 'e-1'
    },
    post: {
       type: String,
       enum: ['prime minister', 'chief minister', 'mayor'], 
       required: true,
     },
     year: {
       type: Number,
       required: true,
     },
     region:{
        type: String,
     },
     competingCandidates: [{//array of _id:ObjectId
       type: Schema.Types.ObjectId,
       ref: 'Party', 
     }],
     winner: {
       type: Schema.Types.ObjectId,
       ref: 'Party', // Reference to the Candidate model
     } 
 });
 ElectionRecordSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next(); // Skip if not a new document
    }
    try {
        const lastRecord = await this.constructor.findOne({}, { eid: 1 }).sort({ eid: -1 });
        if (lastRecord) {
            const lastEid = lastRecord.eid;
            const currentNumber = parseInt(lastEid.split('-')[1]);
            this.eid = `e-${currentNumber + 1}`;
        }
    } catch (error) {
        console.error('Error generating eid:', error);
    }
    next();
 });

 const ElectionRecord = mongoose.model('ElectionRecord', ElectionRecordSchema);

 export default ElectionRecord;