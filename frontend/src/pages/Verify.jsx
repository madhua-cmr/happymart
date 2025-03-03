/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Verify = () => {

  const{navigate,token,setCartItems,backend_url}=useContext(ShopContext)
  const[searchParams,setSearchParams]=useSearchParams()

  const success=searchParams.get('success');
  const orderId=searchParams.get('orderId');

  const verifyPayment=async()=>{
   
try {
  

  const response=await axios.post(backend_url+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
  if(response.data.success){
 
    toast.success(response.data.message);
    setCartItems({}) 
    setTimeout(()=>{ 
      
      navigate('/orders')

    },1500)
  
  }else{
    console.log(response.data.message)
    navigate('/')
  }
} catch (error) {
   console.log(error);
   toast.error(error.message)
}
  }

  useEffect(()=>{
    verifyPayment()
  },[token])

  return (
    <div className="  h-[500px] w-full items-center justify-center flex "><div className="inset-0 z-50 text-[22px] font-bold ">Thanks For Ordering ! &#10084;</div></div>
  )
}

export default Verify
