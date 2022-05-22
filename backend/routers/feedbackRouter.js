import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Feedback from '../models/Feedback.js'


const feedbackRouter = express.Router();

feedbackRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const feedbacks = await Feedback.find({}).sort({createdAt: -1});
    res.send(feedbacks);
}));

export default feedbackRouter;