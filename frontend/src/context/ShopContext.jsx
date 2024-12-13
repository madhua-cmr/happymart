/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { createContext,  useEffect,  useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";

import {useNavigate} from "react-router-dom"

export const ShopContext=createContext()

const ShopContextProvider = ({children}) => {
  const navigate=useNavigate()
  const[cartItems,setCartItems]=useState({})
  const currency='₹';
  const [delivery_charges,setDeliveryCharges]=useState(20);
  const [products,setProducts]=useState([])
 const[search,setSearch]=useState("");
 const backend_url=import.meta.env.VITE_BACKEND_URL;
 const [showSearch,setShowSearch]=useState(false);
 const [token,setToken]=useState('')
 const addToCart=async(itemId,size)=>{

  if(!size){
    toast.error("Please select size");
    return;
  }
  let cartData=structuredClone(cartItems)
  if(cartData[itemId]){
    if(cartData[itemId][size]){
      cartData[itemId][size]+=1
    }else{
      cartData[itemId][size]=1
    }

  }
  else{
    cartData[itemId]={}
    cartData[itemId][size]=1
  }
  setCartItems(cartData)

  if(token){
    try{
   await axios.post(backend_url+'/api/cart/add',{itemId,size},{headers:{token}})
    }catch(error){
     console.log(error);
     toast.error(error.message);

    }
  }
 }

 const getCartCount=()=>{
  let totalCount = 0;
  for(const items in cartItems){
    for(const item in cartItems[items]){
      try{
        if(cartItems[items][item]>0){
          totalCount+=cartItems[items][item]
        }
      
      }catch(error){
console.log(error)
      }
    }
  }
    return totalCount;
  
 }

 const getCartAmount=()=>{
  let totalAmount=0;
  
  for(const items in cartItems){
    let itemInfo=products.find((product)=>product._id===items)
    for(const item in cartItems[items]){
    try{
      if(cartItems[items][item]>0){
        totalAmount+=itemInfo.price*cartItems[items][item];
      }
    }catch(error){
 console.log(error)
    }
    
    
 
  }
    
}
  return totalAmount;
 }

 const updatequantity=async(itemId,size,quantity)=>{
  let cartData=structuredClone(cartItems)
  cartData[itemId][size]=quantity;
  setCartItems(cartData);

  if(token){
    try{
   await axios.post(backend_url+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
    }catch(error){
     console.log(error);
     toast.error(error.message);
     
    }
  }
 }
const getProductsData=async()=>{
  try {
    const response=await axios.get(backend_url+"/api/product/list")
    if(response.data.success){
      setProducts(response.data.products)
    }else{
      toast.error(response.data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
}


const getUserCart=async(token)=>{
  try{
    const response=await axios.post(backend_url+"/api/cart/get",{},{headers:{token}})
  
    if(response.data.success){
      setCartItems(response.data.cartData);
    }else{
 console.log(response.data.message);
    }

  }catch(error){
  console.log(error);
  toast.error(error.message)
  }
}
// Fetch products when the component mounts
useEffect(() => {
  getProductsData();
}, []);

// Sync user cart when the token changes
useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);

// Adjust delivery charges when the cart changes
useEffect(() => {
  if (getCartAmount() > 500) {
    setDeliveryCharges(0);
  } else {
    setDeliveryCharges(20);
  }
}, [cartItems]);
 
  const contextValue={products ,setCartItems,currency,delivery_charges,search,setSearch,setShowSearch,showSearch,addToCart,getCartCount,cartItems,backend_url,updatequantity,getCartAmount,token,setToken,navigate,getUserCart}

  return (
     <ShopContext.Provider value={contextValue}>
        {children}
        </ShopContext.Provider>

  )
}

export default ShopContextProvider;

