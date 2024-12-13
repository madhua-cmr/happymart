import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
const genToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);

}
const loginUser=async(req,res)=>{
try{
    const {email,password} =req.body;
    const user =await userModel.findOne({email});
    if(!user){
       return res.json({success:false,message:"User doesn't exist"});

    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(! isPasswordValid ){
        return res.json({success:false,message:"Password doesn't match"});
    }
    const token=genToken(user._id)
    res.json({success:true,token,message:"Login succesful"})
}catch(err){
    res.json({success:false,message:err.message})
}

}


const registerUser=async(req,res)=>{
try{
    const {name,email,password}=req.body;
    const existUser=await userModel.findOne({email});
    if(existUser){
        return res.json({success:false,message:"User already exists"});
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter valid mailid"});
    }
    if(password.length<8){
     return res.json({success:false,message:"Enter a strong password"});

    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new userModel({
        name,email,password:hashedPassword
    })
    const user=await newUser.save()
    const token =genToken(user._id)
    res.json({success:true,token})
}catch(err){
    console.log(err);
    res.json({success:false,message:err.message})
}

}


const adminLogin=async(req,res)=>{
 try {
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
    const token=jwt.sign(email+password,process.env.JWT_SECRET);
    res.json({success:true,token})
    }
    else{
    res.json({success:false,message:"Invalid credentials"})
    }
 } catch (error) {
    res.json({success:false,message:error.message})
 }
}

export {loginUser,registerUser,adminLogin} 