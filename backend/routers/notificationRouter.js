import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';


const notificationRouter = express.Router();

notificationRouter.post('/add', expressAsyncHandler(async (req, res)=>{
    const notification = new Notification({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        content: req.body.content,
        type: req.body.type,
        status: ","
    });

    const newNotification = await notification.save();

    res.send(newNotification);
}));


notificationRouter.get('/user/:id/list', expressAsyncHandler(async (req, res)=>{
    const notification = await Notification.find({receiverId: req.params.id}).sort({createdAt: 1});

    res.send(notification);
}));

export default notificationRouter;