import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {type: String},
    phoneNum: {type: String, required: true, unique: true},
},
    {
        timestamps: true,
    },
);

contactSchema.index({ name: 'text', phoneNum: 'text' });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;