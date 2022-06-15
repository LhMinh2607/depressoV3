// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import Notification from '../models/Notification.js';
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const Notification =  require('../models/Notification.js');
const User = require('../models/User.js');

const notificationRouter = express.Router();

notificationRouter.post('/add', expressAsyncHandler(async (req, res)=>{
    if(req.body.type==="commentAlert"){
        console.log(req.body.type)
        const notification = new Notification({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            content: req.body.content,
            type: req.body.type,
            postId: req.body.postId,
            status: "",
        });
        const newNotification = await notification.save();
        res.send(newNotification);
    }else if(req.body.type==="friendRequest"){
        console.log(req.body.type)

        const notification = new Notification({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            content: req.body.content,
            type: req.body.type,
            status: "",
        });
        const newNotification = await notification.save();
        res.send(newNotification);
    }else if(req.body.type==="counselingRequest"){
        console.log(req.body.type)
        const notification = new Notification({
            senderId: req.body.senderId,
            receiverId: req.body.senderId,
            content: req.body.content,
            type: req.body.type,
            status: "",
        });
        const newNotification = await notification.save();
        const user = await User.findById(req.body.senderId);
        if(user){
            user.counselingRequest = true;
            const updatedUser = await user.save()
            res.send({newNotification, user});
        }
    }
    
}));

notificationRouter.put('/edit', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.findById(req.body.notifId);
    console.log(notification);
    if(notification){
        notification.status = "checked";
        const updatedNotification = await notification.save()
        res.send(updatedNotification);
        if(notification.type==="counselingRequest"){
            const user = await User.findById(notification.senderId);
            user.counselingRequest === false;
            const updatedUser = await user.save();
        }
    }else{
        res.status(404).send({message: "Not found"})
    }
}));

notificationRouter.get('/user/:id/list', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.find({receiverId: req.params.id}).sort({createdAt: -1});

    res.send(notification);
}));

notificationRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.find({}).sort({createdAt: -1});

    res.send(notification);
}));

module.exports = notificationRouter;