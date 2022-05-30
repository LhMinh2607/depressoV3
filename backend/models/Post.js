// import mongoose from 'mongoose';
const mongoose =  require('mongoose');
const {Schema} = mongoose;

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    thumbnail: {type: String},
    description: {type: String},
    content: {type: String, required: true},
    keywords: [{type: String}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPinned: {type: Boolean, default: false},
    isHomepage: {type: Boolean, default: false},
    postComments: [
        {   
            commenter: {type: String}, //userId
            content: {type: String},
            createdAt: {type: Date},
            updatedAt: {type: Date},
        },
    ],
},
    {
        timestamps: true,
    },
);

postSchema.index({ title: 'text', keywords: 'text' });


const Post = mongoose.model('Post', postSchema);

Post.createIndexes();

module.exports = Post;