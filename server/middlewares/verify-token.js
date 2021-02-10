const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];  // whenever someone make a request we can attach something to the headers
    let checkBearer = 'Bearer';
    

    if(token) {             //if token exist

        if(token.startsWith(checkBearer)) {         //if token start with Bearer then we want to remove that Bearer - OPTIONAL
            token = token.slice(checkBearer.length, token.length);      
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {       //verify token -> first you have to pass in the token and then you have to passin the secret key. SECRET key will be your secret passage to get a decrypted object from the token, without SECRET there is no way to get the decrypted or the decoded object  
            if(err) {               //if token is not valid 
                res.json({
                    success: false,
                    message: "Failed to authenticate"
                })
            } else {        //if it's success then we want to attach the decrypted object to a request.decoded
                req.decoded = decoded;          //decoded is user object   decoded = user {}   
                next();
            }
        })  
    } else {            //if token doesn't exist 
        res.json({
            success: false,
            message: "No token Provided"
        })
    }
}