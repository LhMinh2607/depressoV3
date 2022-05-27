import mongoose from 'mongoose';

const callLogSchema = new mongoose.Schema({
    name: {type: String},
    phoneNum: {type: String, required: true},
    callStatus: {type: String},
    length: {type: Number},
    endedBy: {type: String},
    startedBy: {type: String, required: true},
    callEndedWithCause: {type: String},
},
    {
        timestamps: true,
    },
);

const CallLog = mongoose.model('CallLog', callLogSchema);

export default CallLog;