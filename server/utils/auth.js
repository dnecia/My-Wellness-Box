const jwt = require('jsonwebtoken');

const secret = 'mysecret';
const expiration= '3h';

module.exports ={
    authMiddleware: function(req, res,next){
        //allows token to be sent via req.query or headers.
        let token = req.query.token || req.headers.authorization;

        //[Bearer, "<token value>"]
        if(req.headers.authorization){
            token=token
            .split('')
            .pop()
            .trim();
        }
        if(!token){
            return res.status(400).json({ message: 'invalid token'});
        }
        try{
            const { data } = jwt.verify(token, secret, {maxAge: expiration});
        } catch {
            console.log('invalid token');
            return res.status(400).json({ message: 'invalid token'});
        }
        //send to next endpoint.
        next();
    }
}