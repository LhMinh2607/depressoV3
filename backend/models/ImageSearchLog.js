// import mongoose from 'mongoose';
const mongoose =  require('mongoose');
const {Schema} = mongoose;

//just cuz I wanted to log user's image requests. 100 queries per day for all users
const imageSearchLogSchema = new mongoose.Schema({
    query: {type: String, required: true},
    url: {type:String, required: true},
    source: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
    {
        timestamps: true,
    },
);

imageSearchLogSchema.index({ title: 'text', keywords: 'text' });


const ImageSearchLog = mongoose.model('ImageSearchLog', imageSearchLogSchema);

module.exports = ImageSearchLog;