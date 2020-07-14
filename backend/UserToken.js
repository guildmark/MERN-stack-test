const jwt = require("jsonwebtoken");

//Function to get a token and verify based on a secret key
module.exports = function(req,res,next) {

    try {
        const token = req.header("auth-token");
        const verifiedToken =  jwt.verify(token, process.env.TOKEN);
        req.user = verifiedToken;
    }   
    catch(err) {
        console.log(err);
    }
    next();
};