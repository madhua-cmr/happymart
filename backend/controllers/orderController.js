import order from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import "dotenv/config"

const currency='inr';
const deliveryCharges=10
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const allorders=async(req,res)=>{
try {
    const orders=await order.find({});
     res.json({success:true,orders})
    
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}
const updateStatus=async(req,res)=>{
    try {
        const{orderId,status}=req.body
        await order.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const userorders=async(req,res)=>{
    try {
        const{userId}=req.body;

        const orders=await order.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
   res.json({success:false,message:error.message})
    }
}
const codpay=async(req,res)=>{
    try {
        const{userId,items,amount,address}=req.body;
        const orderData={
            userId,items,amount,address,paymentMethod:"COD",payment:false,date:Number(Date.now())
        }
        const newOrder=new order(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const stripePay=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const{origin}=req.headers;
        const orderData={
            userId,items,amount,address,paymentMethod:"COD",payment:false,date:Number(Date.now())
        }
        const newOrder=new order(orderData);
        await newOrder.save();
        
        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"deliveryCharges"
                },
                unit_amount:deliveryCharges*100
            },
            quantity:1
        })
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
         })

         res.json({success:true,session_url:session.url})


    } catch (error) {
        console.log(error);
    res.json({success:false,message:error.message})
    }
}


const verifyStripe=async(req,res)=>{
    const {orderId,success,userId}=req.body;
    try {
        if(success=="true"){
            await order.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {allorders,updateStatus,userorders,codpay,stripePay,verifyStripe}