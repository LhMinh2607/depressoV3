import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import JsSIP from "jssip";
import CallLog from '../models/CallLog.js';
import mongoose from 'mongoose';


const callRouter = express.Router();
callRouter.get('/log/list', expressAsyncHandler(async (req, res)=>{
    // const calllog = await CallLog.find({}).sort({createdAt: -1});

    const calllog = await CallLog.aggregate([
    {$sort: {createdAt: -1}},
    {$group: {
        _id:{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
        // detailDate :{ date: "$createdAt"},
        list: { $push: "$$ROOT" },
        count: { $sum: 1 },
    }}, 
    {$sort: {
        _id: -1
    }}
    ]);

    

    res.send(calllog);
}));

callRouter.post('/number', expressAsyncHandler(async (req, res)=>{
    // console.log(req.body.phoneNumber);
    res.send({status: 'call is in progress', calllog: newCallLog});
    
}));

callRouter.post('/log', expressAsyncHandler(async (req, res)=>{
    const calllog = new CallLog({
        name: req.body.name,
        phoneNum: req.body.phoneNumber,
        startedBy: req.body.callStartedBy,
    });
    const newCallLog = await calllog.save();
    console.log(req.body.phoneNumber);

    // res.send({status: 'call ended', calllog: newCallLog});
    // res.send({status: 'call ended', calllog: "testing phase, logging is temporarily stopped"});
    res.send(newCallLog);
}));

callRouter.put('/updateLog/:id', expressAsyncHandler(async (req, res)=>{
    console.log("updateLog for id:"+req.params.id);
    const calllog = await CallLog.findById(req.params.id);
    if(calllog){
        if(req.body.length){
            calllog.length = req.body.length;
        }else{
            calllog.length = 0;
        }
        calllog.endedBy = req.body.callEndedBy;
        calllog.callEndedWithCause = req.body.cause;
        const newCallLog = await calllog.save();
        res.send(newCallLog);
    }else{
        res.status(404).send({message: "404"});
    }
}));

export default callRouter;