import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Drink from '../models/Drink.js'

const drinkRouter = express.Router();

drinkRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const drinks = await Drink.find({});
    res.send(drinks);
}));

drinkRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        res.send(drink);
    }else{
        res.status(404).send({message: 'Không tìm thấy sản phẩm'});
    }
}));


drinkRouter.get('/related/:id', expressAsyncHandler(async(req, res)=>{

    const drink = await Drink.findById(req.params.id);
    const relatedDrinks = await Drink.find({tags: {$in: drink.tags}, _id: {$nin: req.params.id}}).sort({rating: 1, reviewNum: 1}).limit(4);
    
    if(relatedDrinks){
        res.send(relatedDrinks);
    }else{
        res.status(404).send({message: 'Không có sản phẩm liên quan'});
    }
}));


export default drinkRouter;