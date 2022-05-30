// import express from 'express'
// import expressAsyncHandler from 'express-async-handler'
// import ImageSearchLog from '../models/ImageSearchLog.js'
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const ImageSearchLog =  require('../models/ImageSearchLog.js');

const imageSearchRouter = express.Router();

imageSearchRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const imageSearch = await ImageSearchLog.find({});
    res.send(imageSearch);
}));

module.exports = imageSearchRouter;