import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    phoneNumber: {type: String, required: false},
    address: {type: String, required: true},
    occupation: {type: String, required: true},
    issues: [{type: String, required: false}],
    mood: {type: String, required: false},
    progress: {type: Number, required: true, default: 0},
    desc: {type: String, required: false},
    backgroundImage: {type: String, required: false},
    backgroundMusic: {type: String, required: false},
    avatar: {type: String, required: false},
    globalBackground: {type: Boolean, default: false},
},
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;