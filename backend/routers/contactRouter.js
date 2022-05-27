import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import JsSIP from "jssip";
import Contact from '../models/Contact.js';

const contactRouter = express.Router();
contactRouter.get('/', expressAsyncHandler(async (req, res)=>{
    const contacts = await Contact.find({}).sort({name: 1});

    res.send(contacts);
}));

contactRouter.post('/save', expressAsyncHandler(async (req, res)=>{
    var re = new RegExp("[0-9]{10}");
    if(req.body.phoneNumber.length!==10 || !re.test(req.body.phoneNumber)){
        res.status(400).send({message: "10 Digit-number only"});
    }
    
    const contact = new Contact({
        name: req.body.name,
        phoneNum: req.body.phoneNumber,
    });

    const newContact = await contact.save();

    if(newContact){
        res.send({success: true, message:"SAVED SUCCESSFULLY", content: newContact});
    }else{
        res.send({message: "ERROR"});
    }
}));

contactRouter.put('/edit/:id', expressAsyncHandler(async (req, res)=>{
    var re = new RegExp("[0-9]{10}");
    if(req.body.phoneNumber.length!==10 || !re.test(req.body.phoneNumber)){
        res.status(400).send({message: "10 Digit-number only"});
    }
    
    const contact = await Contact.findById(req.params.id);
    if(contact){
        contact.name = req.body.name;
        contact.phoneNum = req.body.phoneNumber;

        const updatedContact = await contact.save();

        res.send({success: true, message:"SAVED SUCCESSFULLY", content: updatedContact});
    }else{
        res.status(404).send({message: "404"});
    }
}));

contactRouter.put('/remove/:id', expressAsyncHandler(async (req, res)=>{
    
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(contact){
        res.send({success: true, message:"REMOVED SUCCESSFULLY"});
    }else{
        res.status(404).send({message: "404"});
    }
}));


contactRouter.get('/number/:num', expressAsyncHandler(async (req, res)=>{
    const contact = await Contact.findOne({phoneNum: req.params.num});

    if(contact){
        res.send(contact);
    }else{
        res.status(404).send({message: "404"});
    }
}));

contactRouter.get('/search/:keyword', expressAsyncHandler(async (req, res)=>{
    var splitStr = req.params.keyword.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }

    const searchedKey = req.params.keyword

    const searchedContacts = await Contact.find({$or: [
        {$text: {$search: searchedKey}},
    ]},
    { 
        score: { $meta: 'textScore'} 
    }).sort({score: { $meta: 'textScore'} }).limit(5);
    if(searchedContacts.length>0){
        res.send(searchedContacts);
    }else{
        res.status(404).send({message: "404"});
    }
}));



export default contactRouter;

