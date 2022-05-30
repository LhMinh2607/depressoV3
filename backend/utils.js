// import jwt from 'jsonwebtoken';
var jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET || 'secretmessage', {
        expiresIn: '30d', //expires in 30 days
    }); //jsonwebtoken
};
module.exports = generateToken;

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length); //Bearer XXXXXXXX removed the 1st-7th character which is 'Bearer'
        jwt.verify(token, process.env.JWT_SECRET || 'secretmessage', (err, decode)=>{
            if(err){
                res.status(401).send({message: '401 - Invalid Token: '+err});
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(404).send({message: '404 - No Token'});
    }
}
// module.exports = isAuth;