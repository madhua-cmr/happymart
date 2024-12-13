import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios";


const Orders = () => {
  const{backend_url, token,currency}=useContext(ShopContext);
  const[orderData,setOrderData]=useState([])

  const loadOrderData=async()=>{
    try {
      if(!token){
        return null;
      }
      const response=await axios.post(backend_url+"/api/order/userOrders",{},{headers:{token}})
     if(response.data.success){
      let allOrdersItem=[]
      response.data.orders.map((order)=>{
        order.items.map((item)=>{
          item['status']=order.status;
          item['payment']=order.payment?"Done":"Pending";
          item['paymentMethod']=order.paymentMethod;
          item['date']=order.date;
          allOrdersItem.push(item)
        })
      })
      setOrderData(allOrdersItem.reverse())
     }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   loadOrderData()
  },[token])
  return (
  <section>
    <div className="max-padd-container ">
    <div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8 ">
    
        <div className="p-4  "><h2 className="text-blue-950 font-semibold text-[18px]">Orders Tracker</h2></div>
        <div className="p-4 flex flex-col gap-y-6 ">
          {orderData.map((item,index)=>(
            <div key={index} >
              <div className="py-4  text-gray-700 flex flex-col gap-4">
              <div className="flex flex-col items-center sm:flex-row gap-x-3  w-full ">
              <div><img src={item.image[0]} alt={item.name} className="aspect-square w-[100px]  rounded-lg"/>
              </div>
                <div className="block w-full"><h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                <div className="flexBetween">
               <div >
                <div className="flex items-center gap-x-2">
                  <div className=" flex items-center  gap-x-2 sm:gap-x-3"><p className="medium-14 ">Price</p>
                  <p className="text-slate-600">{currency}{item.price}</p>
                </div>
               
                <div className=" flex items-center  gap-x-2"><p className="medium-14 ">Quantity</p>
                <p className="text-slate-600">{item.quantity}</p>
                </div>
                
              <div className=" flex items-center  gap-x-2"><p className="medium-14 ">Size</p></div>
                <p className="text-slate-600">{item.size}</p>

              </div>
              <div className=" flex items-center  gap-x-2">
                <p className="medium-14 ">Date</p>
                <p className="text-slate-600">{new Date(item.date).toDateString()}</p>
              </div>
              <div className=" flex items-center  gap-x-2"><p>{item.paymentMethod}</p>
              <p>{item.payment}</p></div>
              </div>

              <div className="flex flex-col xl:flex-row gap-3    ">
                <div className="flex items-center gap-2">
                <p className="bg-green-500 min-w-2 h-2 rounded-full  "></p>
                <p className="medium-14">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="btn-secondary !p-1.5 !text-xs">Track Delivery</button>
                </div>
                </div>
                </div>
              </div>
              </div>
 <hr  className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2"/>
 </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export default Orders
