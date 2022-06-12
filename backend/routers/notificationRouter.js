// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import Notification from '../models/Notification.js';
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const Notification =  require('../models/Notification.js');

const notificationRouter = express.Router();

notificationRouter.post('/add', expressAsyncHandler(async (req, res)=>{
    if(req.body.postId){
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
    }else{
        const notification = new Notification({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            content: req.body.content,
            type: req.body.type,
            status: "",
        });
        const newNotification = await notification.save();
        res.send(newNotification);
    }
    
}));

notificationRouter.put('/edit', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.findById(req.body.notifId);
    console.log(notification);
    if(notification){
        notification.status = "checked";
        const updatedNotification = await notification.save()
        res.send(updatedNotification);
    }else{
        res.status(404).send({message: "Not found"})
    }
}));

notificationRouter.get('/user/:id/list', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.find({receiverId: req.params.id}).sort({createdAt: -1});

    res.send(notification);
}));

module.exports = notificationRouter;