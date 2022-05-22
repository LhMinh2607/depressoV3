import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import ImageSearchLog from '../models/ImageSearchLog.js'


const imageSearchRouter = express.Router();

imageSearchRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const imageSearch = await ImageSearchLog.find({});
    res.send(imageSearch);
}));

export default imageSearchRouter;