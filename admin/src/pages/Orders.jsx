/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { backend_url } from "../App";
import { BsBox2HeartFill } from "react-icons/bs";
import {toast} from "react-toastify"

const Orders = ({token}) => {
  const[orders,setOrders]=useState([])
  const fetchAllOrders=async()=>{
    if(!token){
      return null;
    }
    try {
      const response=await axios.post(backend_url+'/api/order/list',{},{headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const statusHandler=async(e,orderId)=>{
try {
  const response=await axios.post(backend_url+"/api/order/status",{orderId,status:e.target.value},{headers:{token}})
  if(response.data.success){
   
   await fetchAllOrders()
   toast.success(response.data.message);
  }else{
    console.log(response)
  }
} catch (error) {
  console.log(error);
 toast.error(error.message)
}
  }
  useEffect(()=>{
    fetchAllOrders()
  },[token])
  return (
    <div className="pl-8 sm:px-8">
      <h3 className="text-[18px] font-bold">Orders List</h3>
      <div className="flex flex-col font-semibold gap-4 pt-4">
        {orders.map((order)=>(
          <div key={order._id} className="grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_1fr]   lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-slate-600 bg-white rounded-lg">
  <BsBox2HeartFill className="text-3xl text-red-400" />
  <div className="overflow-hidden  ">
    <div>
      {order.items.map((item,index)=>{
        if(index===order.items.length-1){
          return<p key={index} className="text-[16px]">
            <span className="text-slate-950 ">Items: </span>
            {item.name} x{item.quantity} <span>&quot;{item.size}&quot;</span>
          </p>
        }
        else{
          return <p key={index} className="text-[16px] ">
          <span className="text-slate-950 " >Items: </span>
          {item.name} x{item.quantity} <span>&quot;{item.size}&quot;</span>,
        </p>
        }
      })}
    </div>
   <p><span>Name: </span>{order.address.firstName+" "+order.address.lastName}</p>
   <div className="overflow-hidden"><span>Address: </span>
   <span>{order.address.street}</span>
   <span >{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</span></div>
       <p>Contact no: <span>{order.address.phno}</span></p>

        
  </div>
  <div>
    <p className="text-sm">Total Products: {order.items.length}</p>

    <p className="mt-3">Payment Method:{order.paymentMethod}</p>
    <p>Payment: {order.payment?"Completed":"Pending"}</p>
    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
   
  </div>
  <p className="text-sm font-semibold">&#8377;{order.amount}</p>
  <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="ring-1 p-1 ring-slate-900/5 rounded max-w-36 bg-primary">
    <option value="Order Placed">Order Placed</option>
    <option value="Packing">Packing</option>
    <option value="Shipped">Shipped</option>
    <option value="Out Of Delivery">Out Of Delivery</option>

    <option value="Delivered">Delivered</option>
  </select>
          </div>
      )  )}
      </div>
    </div>
  )
}

export default Orders
