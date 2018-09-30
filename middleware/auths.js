const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access not granted, no token found');

    try{
    const decodedPayload = jwt.verify(token,config.get('jwtPrivateKey'));
    req.user = decodedPayload;
    next();

    }
    catch(ex){
        res.status(400).send('Invalid Token');
    }
}

