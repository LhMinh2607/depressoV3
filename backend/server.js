// import express from 'express'
// import mongoose from "mongoose"
// import forumRouter from './routers/forumRouter.js'
// import dotenv from 'dotenv';
// import userRouter from './routers/userRouter.js';
// import categoryRouter from './routers/categoryRouter.js'
// import {MongoClient} from 'mongodb';
// import feedbackRouter from './routers/feedbackRouter.js';
// import imageSearchRouter from './routers/imageSearchRouter.js';
// import callRouter from './routers/callRouter.js';
// import contactRouter from './routers/contactRouter.js';
// import notificationRouter from './routers/notificationRouter.js';
var express = require('express');
var mongoose = require('mongoose');
var forumRouter = require('./routers/forumRouter.js');
const dotenv =  require('dotenv');
const userRouter =  require('./routers/userRouter.js');
const categoryRouter =  require('./routers/categoryRouter.js');
const {MongoClient} =  require('mongodb');
const feedbackRouter =  require('./routers/feedbackRouter.js');
const imageSearchRouter =  require('./routers/imageSearchRouter.js');
const callRouter =  require('./routers/callRouter.js');
const contactRouter =  require('./routers/contactRouter.js');
const notificationRouter =  require('./routers/notificationRouter.js');
const http = require("http");
const socketIo = require("socket.io");
const adminRouter = require('./routers/adminRouter.js');

dotenv.config();
const app = express();
app.use(express.json()); //http
app.use(express.urlencoded({extended: true}));

//connect to mongodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mentalBotDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
err => {
    if(err) throw err;
    console.log('connected to MongoDB via Mongoose')
});

// Retrieve

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/mentalBotDB", function(err, db) {
//   if(!err) {
//     console.log("connected to MongoDB via MongoDB Nodejs Driver");
//   }
// });


app.use('/api/forum', forumRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/imageSearch', imageSearchRouter);
app.use('/api/call', callRouter);
app.use('/api/contact', contactRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Server is ready!');
    
});
app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message});

});

const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server at http://localhost:${port}`);
// });

const server = http.createServer(app);

const io = socketIo(server, {cors: {
    // origin: process.env.ORIGIN,
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["polling", "websocket"]
  }}); // < Interesting!



// app.set('sock', io);

let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("sid:"+socket.id);
  if (interval) {
    clearInterval(interval);
  }
  socket.on("joinPost", (id)=>{
    console.log("joined Post");
    socket.join(id);
  })
  socket.on("leavePost", (id)=>{
    console.log("left Post");
    socket.leave(id);
  })
  socket.on("joinUser", (id)=>{
    console.log("joined User");
    socket.join(id);
  })

  socket.on("addComment", (id) => {
    // interval = setInterval(() => {
      
    //   // clearInterval(interval);
    //   // io.sockets.emit("loadComments");
        
    //   // clearInterval(interval);
    // }, 1000);
    setTimeout(()=>{
      socket.to(id).emit("loadComments");
      console.log(socket.to(id).emit("loadComments"));
      console.log("server addComment");
      const newDate = new Date();
      console.log("date: "+newDate);
    }, 1);
  });
  socket.on("addNotification", () => {
    setTimeout(()=>{
      socket.broadcast.emit("loadNotifications");
      console.log(socket.broadcast.emit("loadNotifications"));
      console.log("server loadNotifications");
      const newDate = new Date();
      console.log("date: "+newDate);
    }, 1);
  });
  socket.on("addCounselingRequest", ()=> {
    setTimeout(()=>{
      socket.broadcast.emit("loadCounselingRequests");
      console.log(socket.broadcast.emit("loadCounselingRequests"));
      console.log("server loadCounselingRequests");
      const newDate = new Date();
      console.log("date: "+newDate);
    }, 1);
  });
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
io.eio.pingInterval = 1000;

// const getApiAndEmit = socket => {
//     const response = new Date();
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
//     // console.log(response);
// };




server.listen(port, () => console.log(`Listening on port ${port}`));
// module.exports = io;


