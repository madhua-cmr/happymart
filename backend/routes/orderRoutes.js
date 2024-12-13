
import {allorders,updateStatus,verifyStripe,userorders,codpay,stripePay} from "../controllers/orderController.js"
import express from "express"
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRoutes=express.Router();

//admin
orderRoutes.post("/list",adminAuth,allorders);
orderRoutes.post("/status",adminAuth,updateStatus);


//user
orderRoutes.post("/userOrders",authUser,userorders)

orderRoutes.post("/verifyStripe",authUser,verifyStripe);
// for payment
orderRoutes.post("/cod",authUser,codpay);
orderRoutes.post("/stripe",authUser,stripePay)

export default orderRoutes