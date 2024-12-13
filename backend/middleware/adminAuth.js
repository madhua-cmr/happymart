import jwt from "jsonwebtoken"
import "dotenv/config"
const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.json({success:false,message:"Not authenticated User"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode)
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
        {
            return res.json({success:false,message:"Not Authorized User"});

        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
export default adminAuth;
