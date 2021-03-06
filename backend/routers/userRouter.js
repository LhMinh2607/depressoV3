// import express from 'express';
// import expressAsyncHandler from 'express-async-handler'
// import User from '../models/User.js'
// import bcrypt from 'bcryptjs';
// import {generateToken, isAuth} from '../utils.js'
// import mongoose from 'mongoose';
// import UserImageLog from '../models/UserImageLog.js';
// import Notification from '../models/Notification.js';
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const User =  require('../models/User.js');
const bcrypt =  require('bcryptjs');
const generateToken=  require('../utils.js');
const isAuth =  require('../utils.js');
const mongoose =  require('mongoose');
const UserImageLog =  require('../models/UserImageLog.js');
const Notification =  require('../models/Notification.js');

const userRouter = express.Router();
userRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const users = await User.find({}).sort({createdAt: 1});

    res.send(users);
    
}));
userRouter.post('/signup', expressAsyncHandler(async(req, res)=>
{
    const user = new User({
        name: req.body.name, 
        username: req.body.username,
        email: req.body.email.toLowerCase(), 
        password: bcrypt.hashSync(req.body.password, 8),
        gender: req.body.gender,
        dob: req.body.dob,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        occupation: req.body.occupation,
        mood: "",
        issues: [],
        progress: 0,
        desc: req.body.desc,
        counselingRequest: false,
    });
    const createdUser = await user.save();
    // res.send({
    //     _id: createdUser._id,
    //     name: createdUser.name,
    //     email: createdUser.email,
    //     token: generateToken(createdUser),
    //     gender: createdUser.gender,
    //     dob: createdUser.dob,
    //     phoneNumber: createdUser.phoneNumber
    // });
}));

userRouter.post('/signin',
expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password))
        {
            // const userStatus = await User.findOneAndUpdate({email: req.body.email}, {$set: {onlineStatus: true}});
            // userStatus.save();
            res.send({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                dob: user.dob,
                phoneNumber: user.phoneNumber,
                address: user.address,
                occupation: user.occupation,
                mood: user.mood,
                issues: user.issues,
                progress: user.progress,
                desc: user.desc,
                avatar: user.avatar,
                backgroundImage: user.backgroundImage,
                backgroundMusic: user.backgroundMusic,
                globalBackground: user.globalBackground,
                friends: user.friends,
                counselingRequest: user.counselingRequest,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Email ho???c m???t kh???u sai. Vui l??ng th??? l???i!'});
    })
);

userRouter.get('/search/:keyword', expressAsyncHandler(async (req, res)=>{
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

userRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        // console.log(user);
        res.send(user);
        // const conversation = await ConversationStore.find({})
        // ConversationStore.find({"events": {$elemMatch: {"text": req.params.id}}})

        // const conversation = await conversationStore.find({$and: [{"events": {$elemMatch: {"text": "6258e2b0ee1e676f8626d4bd"}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}).projection(
        //     {"events": {"text": 1}}
        // )

        // const conversation = ConversationStore.find({$and: [{"events": {$elemMatch: {"text": "6258e2b0ee1e676f8626d4bd"}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}).projection(
        //         {"events": {"text": 1}} 
        // )
    }else{
        res.status(404).send({info: "Ng?????i d??ng kh??ng t???n t???i"});
    }
}));

userRouter.get('/phone/:phone', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({phoneNumber: req.params.phone});
    if(user){
        // console.log(user);
        res.send(user);
        // const conversation = await ConversationStore.find({})
        // ConversationStore.find({"events": {$elemMatch: {"text": req.params.id}}})

        // const conversation = await conversationStore.find({$and: [{"events": {$elemMatch: {"text": "6258e2b0ee1e676f8626d4bd"}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}).projection(
        //     {"events": {"text": 1}}
        // )

        // const conversation = ConversationStore.find({$and: [{"events": {$elemMatch: {"text": "6258e2b0ee1e676f8626d4bd"}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}).projection(
        //         {"events": {"text": 1}} 
        // )
    }else{
        res.status(404).send({info: "Ng?????i d??ng kh??ng t???n t???i"});
    }
}));

//database generated by rasa chatbot
userRouter.get('/:id/conversation/history', expressAsyncHandler(async(req, res)=>{
    const conversationStoreSchema = new mongoose.Schema({}, { strict: false });

    //This database is auto generated by Rasa so I can't define it in Mongoose model
    mongoose.connect('mongodb://localhost/mentalBotDB').then(() => {
        const db = mongoose.connection.db;
        db.collection('conversationStore').find({$and: [{"events": {$elemMatch: {"text": req.params.id}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}, 
        {projection: {"events": {"text": 1, "event": 1, "timestamp": 1}}, }, ).toArray((err, result) => {
            // console.log(result)
            res.send(result);
        });
    }).catch(err => console.log(err.message));

}));

//database generated by rasa chatbot
userRouter.get('/:id/conversation/stat', expressAsyncHandler(async(req, res)=>{
    const conversationStoreSchema = new mongoose.Schema({}, { strict: false });
    var userMsgCount = 0;
    var botMsgCount = 0;

    //This database is auto generated by Rasa so I can't define it in Mongoose model
    mongoose.connect('mongodb://localhost/mentalBotDB').then(() => {
        const db = mongoose.connection.db;
        db.collection('conversationStore').find({$and: [{"events": {$elemMatch: {"text": req.params.id}}}, {"events": {$elemMatch: {"event": "user"}}}]}, 
        {projection: {"events": {"text": 1, "event": 1, "timestamp": 1}}, }, ).toArray((err, result) => {
            // console.log(result)
            // res.send(msgStat);
            
            result.map((session)=>{
                session.events.map((message)=>{
                    if(message.event==="user"){
                        userMsgCount++;
                    }
                    if(message.event==="bot"){
                        botMsgCount++;
                    }
                })
            });
            // console.log(userMsgCount)
            const msgStat = {userMsgCount, botMsgCount}
            res.send(msgStat);
        });
        
    }).catch(err => console.log(err.message));
}));

userRouter.put('/profile/update', expressAsyncHandler(async(req, res)=>{
    // const user = await User.findById(req.user._id);
    const user = await User.findById(req.body.userId);


    // console.log(req.body.gender);
    // console.log(req.body.dob);

    if(user){
        console.log(user);
        user.name=req.body.name || user.name;
        user.email=req.body.email.toLowerCase() || user.email.toLowerCase();
        user.username=req.body.username || user.username;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        user.gender = req.body.gender || user.gender;
        user.dob = req.body.dob || user.dob;
        user.phoneNumber=req.body.phoneNumber || user.phoneNumber;
        user.address = req.body.address || user.address;
        user.occupation = req.body.occupation || user.occupation;
        user.desc = req.body.desc || user.desc;
        user.backgroundImage = req.body.backgroundImage || user.backgroundImage;
        user.backgroundMusic = req.body.backgroundMusic || user.backgroundMusic;
        user.avatar = req.body.avatar || user.avatar;
        if(req.body.globalBackground==="true")
        {
            user.globalBackground = true || user.globalBackground;
        }else if(req.body.globalBackground==="false"){
            user.globalBackground = false || user.globalBackground;
        }
        if(user.backgroundImage || user.backgroundMusic){
            const userImageLog = new UserImageLog({
                // user: req.user._id,
                user: req.body.userId,
                backgroundImage: user.backgroundImage,
                avatar: user.avatar,
                backgroundMusic: user.backgroundMusic,
            });
            const createdImagelog = await userImageLog.save();
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser),
            gender: updatedUser.gender,
            dob: updatedUser.dob,
            phoneNumber: updatedUser.phoneNumber,
            desc: updatedUser.desc,
            backgroundImage: updatedUser.backgroundImage,
            avatar: updatedUser.avatar,
            globalBackground: updatedUser.globalBackground,
        });
    }
}));

userRouter.put('/:receiverId/addFriend/:senderId', expressAsyncHandler(async(req, res)=>{
    const notification = await Notification.findOne({senderId: req.params.senderId, receiverId: req.params.receiverId, type: "friendRequest"});
    const user = await User.findById(mongoose.Types.ObjectId(req.params.receiverId));
    const user2 = await User.findById(mongoose.Types.ObjectId(req.params.senderId));

    if(notification){
        notification.status="checked";
        const updatedNotification = await notification.save();
    }
    if(user && notification && user2){
        user.friends.push({friendId: req.params.senderId, createdAt: new Date()});
        const updatedUser = await user.save();
        user2.friends.push({friendId: req.params.receiverId, createdAt: new Date()});
        const updatedUser2 = await user2.save();
        res.send({user1: {
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser),
            gender: updatedUser.gender,
            dob: updatedUser.dob,
            phoneNumber: updatedUser.phoneNumber,
            desc: updatedUser.desc,
            backgroundImage: updatedUser.backgroundImage,
            avatar: updatedUser.avatar,
            globalBackground: updatedUser.globalBackground,
            friends: updatedUser.friends,
        }, notif: {
            status: notification.status,
        },
        user2: {
            _id: updatedUser2._id,
            name: updatedUser2.name,
            username: updatedUser2.username,
            email: updatedUser2.email,
            role: updatedUser2.role,
            gender: updatedUser2.gender,
            dob: updatedUser2.dob,
            phoneNumber: updatedUser2.phoneNumber,
            desc: updatedUser2.desc,
            backgroundImage: updatedUser2.backgroundImage,
            avatar: updatedUser2.avatar,
            globalBackground: updatedUser2.globalBackground,
            friends: updatedUser2.friends,
        },
    });
    // socketIo.emit('accepted_friend_request', {updatedUser, updatedUser2});
    }
}));

module.exports = userRouter;