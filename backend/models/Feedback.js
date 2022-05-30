// import mongoose from 'mongoose';
const mongoose =  require('mongoose');
const {Schema} = mongoose;

const feedbackSchema = new mongoose.Schema({
    content: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: {type: String, required: false}
},
    {
        timestamps: true,
    },
);

feedbackSchema.index({ title: 'text', keywords: 'text' });


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;