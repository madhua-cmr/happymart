import userModel from "../models/userModel.js";

const addCart=async(req,res)=>{
try {
    const {userId,itemId,size}=req.body;
    const userData=await userModel.findById(userId);
    const cartData=await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }else{
            cartData[itemId][size]=1
        }
    }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Product Added"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})

}

}

const updateCart=async(req,res)=>{
    try{

    
const {userId,itemId,size,quantity}=req.body;
const userData=await userModel.findById(userId);
const cartData=await userData.cartData;

cartData[itemId][size]=quantity
await userModel.findByIdAndUpdate(userId,{cartData})
res.json({success:true,message:"cart updated successfully"})
}
catch(err){
    console.log(err);
    res.json({success:false,message:err.message})
}
}

const getUserCart=async(req,res)=>{

    try{
       
        const {userId}=req.body;
        
    const userData=await userModel.findById(userId);
       const cartData=await userData.cartData;
    res.json({success:true,cartData})
  }
    
       catch(error){
  console.log(error);

  res.json({success:false,message:error.message})
       }
}
export {getUserCart,addCart,updateCart} 