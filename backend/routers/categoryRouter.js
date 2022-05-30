// import express from 'express'
// import expressAsyncHandler from 'express-async-handler'
// import Category from '../models/Category.js'
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const Category =  require('../models/Category.js');

const categoryRouter = express.Router();

categoryRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const categories = await Category.find({});
    res.send(categories);
}));

module.exports = categoryRouter;