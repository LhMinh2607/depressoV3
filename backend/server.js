import express from 'express'
import mongoose from "mongoose"
import forumRouter from './routers/forumRouter.js'
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import categoryRouter from './routers/categoryRouter.js'
import {MongoClient} from 'mongodb';
import feedbackRouter from './routers/feedbackRouter.js';
import imageSearchRouter from './routers/imageSearchRouter.js';
import callRouter from './routers/callRouter.js';
import contactRouter from './routers/contactRouter.js';
import notificationRouter from './routers/notificationRouter.js';


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

app.get('/', (req, res) => {
    res.send('Server is ready!');
    
});


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message});

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});





