import express from "express"
import { addCart, getUserCart, updateCart } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartroutes=express.Router();

cartroutes.post("/add",authUser,addCart);
cartroutes.post("/update",authUser,updateCart);
cartroutes.post("/get",authUser,getUserCart);


export default cartroutes