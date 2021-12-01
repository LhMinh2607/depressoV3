import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    gender: {type: String, required: true},
    birthDate: {type: Date, required: true},
    phoneNumber: {type: String, required: false},
    totalMoneySpent: {type: Number, default: 0},
},
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;