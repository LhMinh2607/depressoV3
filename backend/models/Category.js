// import mongoose from 'mongoose';
const mongoose =  require('mongoose');
const {Schema} = mongoose;

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    thumbnail: {type: String, required: false},
},
    {
        timestamps: true,
    },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;