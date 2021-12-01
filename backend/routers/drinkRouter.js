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



export default drinkRouter;