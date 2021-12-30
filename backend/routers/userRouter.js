import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import {generateToken, isAuth} from '../utils.js'

const userRouter = express.Router();
userRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const users = await User.find({});

    res.send(users);
    
}));
userRouter.post('/signup', expressAsyncHandler(async(req, res)=>
{
    const user = new User({
        name: req.body.name, 
        email: req.body.email.toLowerCase(), 
        password: bcrypt.hashSync(req.body.password, 8),
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber
    });
    const createdUser = await user.save();
    // res.send({
    //     _id: createdUser._id,
    //     name: createdUser.name,
    //     email: createdUser.email,
    //     token: generateToken(createdUser),
    //     gender: createdUser.gender,
    //     birthDate: createdUser.birthDate,
    //     phoneNumber: createdUser.phoneNumber
    // });
}));

userRouter.post('/signin', 
expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password))
        {
            // const userStatus = await User.findOneAndUpdate({email: req.body.email}, {$set: {onlineStatus: true}});
            // userStatus.save();
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Email hoặc mật khẩu sai. Vui lòng thử lại!'});
    })
);

userRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        console.log(user);
        res.send(user);
    }else{
        res.status(404).send({message: "Người dùng không tồn tại"});
    }
}));

userRouter.put('/profile/update', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    // console.log(req.body.gender);
    // console.log(req.body.birthDate);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email.toLowerCase() || user.email.toLowerCase();
        
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        user.gender=req.body.gender || user.gender;
        user.birthDate=req.body.birthDate || user.birthDate;
        user.phoneNumber=req.body.phoneNumber || user.phoneNumber;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser),
            gender: updatedUser.gender,
            birthDate: updatedUser.birthDate,
            phoneNumber: updatedUser.phoneNumber,
        });
    }
}));

export default userRouter;