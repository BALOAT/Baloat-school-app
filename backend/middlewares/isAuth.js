const jwt =require("jsonwebtoken");

const isAuthenticated = async(req, res, next)=>{
    //! Get the token ffrom the header
    // console.log(req.headers);
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1]
    // console.log(token);
    
    //! Verify the token
    const VerifyToken =jwt.verify(token,
         `${process.env.JWT_SECRET}`, 
         (err, decoded)=>{
        // console.log(decoded);
        if(err){
            return false;
        } else{
            return decoded
        }
        
    });
    if (VerifyToken) {
        
    // console.log(VerifyToken);
    // ! save the user into the req obj
    req.user = VerifyToken.id;
    // console.log(req.user);
    next();
    } else{
        const err = new Error('Token expired please login again');
        next(err);
    }
    // res.json({ 
    //     message: "This is auth middleware"
    // });
};


module.exports = isAuthenticated;