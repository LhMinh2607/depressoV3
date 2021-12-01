import express from 'express'
import expressAsyncHandler from 'express-async-handler'


const exRouter = express.Router();

exRouter.get('/ex', expressAsyncHandler(async (req, res)=>{
    res.send({message: "fuck you"});
}));
export default exRouter;