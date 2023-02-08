const jwt=require("jsonwebtoken");
const {SECRET_KEY}=require("../auth/controllers");
const {User} =require("../auth/models");
const isAuthenticated=async(req,res,next)=>{
    try {
        // console.log(req.headers);
        const token=req.headers.authorization;
        if(!token)
        {
            return res.status(422).json({
                message:"token required"
            })
        }
        const verify=jwt.verify(token,SECRET_KEY);
        if(verify && verify._id)
        {
            const userfound=await User.findById(verify._id);
            if(!userfound)
            {
                return res.status(422).json({
                    message:"user not found by token"
                });
            }

            req.body.user_id=verify._id;
            //   res.status(200).json({
            //     message:"authenticated",
                
            // })
            return next();
        }
        else return res.status(422).json({
            message:"user details are not verified"
        });
    } catch (error) {
        console.log("error in middleware authenticated");
        console.log(error.message);
        return res.status(422).json({
            message:"Invalid token"
        });
    }
}

module.exports={isAuthenticated};