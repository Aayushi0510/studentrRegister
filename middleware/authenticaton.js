const jwt = require('jsonwebtoken');

//middleware for verify token
exports.verifytoken=(async(req,res,next)=>{
    try{
        const token=req.headers.authorization
        console.log(token)
        let decode= jwt.verify(token, "mysecretkey");
        req.Userdetail=decode;
        console.log(decode)
        next()
 
     } catch(error)
     {
         res.status(401).send("token is invalid")
     }
 
 })
 