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
            //if no token is found, throw this error message.
            return res.status(400).json({ message: 'invalid token'});
        }
        //verify token and retrieve user data from token.
        try{
            const { data } = jwt.verify(token, secret, {maxAge: expiration});
            req.user=data;
        } catch {
            console.log('invalid token');
            return res.status(400).json({ message: 'invalid token'});
        }
        //send to next endpoint.
        next();
    },
    signToken: function({username,email,_id}){
        const payload= {username, email, _id};

        return jwt.sign({ data: payload}, secret, {expiresIn: expiration});
    }
}