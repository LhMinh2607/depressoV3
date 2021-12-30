import mongoose from 'mongoose';
const {Schema} = mongoose;

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    thumbnail: {type: String},
    description: {type: String},
    content: {type: String, required: true},
    keywords: [{type: String}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
    {
        timestamps: true,
    },
);

const Post = mongoose.model('Post', postSchema);

export default Post;