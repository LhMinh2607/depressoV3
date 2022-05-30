// import mongoose from 'mongoose';
const mongoose =  require('mongoose');
const {Schema} = mongoose;

const notification = new mongoose.Schema({
    content: {type: String, required: true,},
    type: {type: String, required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, required: false},
},
    {
        timestamps: true,
    },
);

const Notification = mongoose.model('Notification', notification);

module.exports = Notification;