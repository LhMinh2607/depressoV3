// import mongoose from 'mongoose';
const mongoose =  require('mongoose');

const userImageLogSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    backgroundImage: {type: String},
    avatar: {type: String},
    backgroundMusic:{type: String},
},
    {
        timestamps: true,
    },
);

const UserImageLog = mongoose.model('UserImageLog', userImageLogSchema);

module.exports = UserImageLog;