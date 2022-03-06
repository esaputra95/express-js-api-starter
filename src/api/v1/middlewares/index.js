const jwt = require('jsonwebtoken');
const config = require('./../../../config/config.json')

const accessToken = function(req, res, next){
    const authHeader = req.headers['authorization'];
    if(authHeader===undefined) return res.send(403);
    const token = authHeader.split(" ")[1];
    if(token==null) return res.send(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.send(403);
        config.user.id = decoded.id;
        config.user.email = decoded.email;
        next()
    })
    
}

module.exports = {accessToken};