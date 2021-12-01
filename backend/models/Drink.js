import mongoose from 'mongoose';
const {Schema} = mongoose;

const drinkSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    image: {type: String},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    reviewNum: {type: Number, default: 0},
    description: {type: String, required: true},
    tags: [{type: String}],
},
    {
        timestamps: true,
    },
);

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;