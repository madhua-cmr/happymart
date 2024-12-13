import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import { FaCartPlus } from "react-icons/fa6";
import { TbShoppingCartMinus } from "react-icons/tb";
import { FcDeleteRow } from "react-icons/fc";
import CartTotal from "./CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate=useNavigate()
  const {cartItems,getCartCount,currency,products,updatequantity}=useContext(ShopContext)
  const [cartData,setCartData]=useState([]);
  const [quantities,setQuantities]=useState({})
  useEffect(()=>{
    const tempData=[]
    const initialQuantities={}
   for(const items in cartItems){
    for(const item in cartItems[items]){
      
      if(cartItems[items][item]>0){
        tempData.push({
        _id:items,
        size:item,
        quantity:cartItems[items][item],
      })
      initialQuantities[`${items}-${item}`]=cartItems[items][item]
    }}}
    setCartData(tempData)
    setQuantities(initialQuantities)
   
  },[cartItems])

  const increment=(id,size)=>{
    const key=`${id}-${size}`;
    const newValue=quantities[key]+1;
    setQuantities(prev=>({...prev,[key]:newValue}))
    updatequantity(id,size,newValue)
  }
  const decrement=(id,size)=>{
    const key=`${id}-${size}`;
    if(quantities[key]>0){
      const newValue=quantities[key]-1;
      setQuantities(prev=>({...prev,[key]:newValue}))
      updatequantity(id,size,newValue)
    }
  
  }
  
  return (
    <section>
      <div className=" max-padd-container "><div className="max-padd-container  py-10 rounded-2xl my-16 bg-white max-xl:mt-8">
        <div className="flex items-baseline gap-x-4">
        <h2 className="text-[18px] text-slate-800">Your cart is {getCartCount()===0?<span>empty !</span>:<span className="text-indigo-950 font-semibold">waiting!</span>}</h2>
        <p className="text-[18px] font-medium text-sky-500">{getCartCount()} Items </p></div>
        <div className="flex flex-col gap-4 mt-4 ">
          {cartData.map((item,i)=>{
            const productData=products.find(product=>product._id===item._id);
            // const key=`${item._id}-${item.size}`

            return(
              <div key={i} className=" p-1 rounded-xl " >
                <div className="flex  items-center gap-x-3">
                  <div className="flex items-start gap-6">
                  <img src={productData.image[0]} alt="img pro" className=" w-16 sm:w-18 rounded"/>
                  </div>
                  <div className="flex flex-col  w-full"><div className=" flexBetween"><h5 className="h5 !my-0 line-clamp-1" >{productData.name}</h5><FcDeleteRow  onClick={()=>updatequantity(item._id,item.size,0)}className="cursor-pointer text-[25px]"/></div>
                  
                  <p className="bold-14 my-0.5">{item.size}
                    </p><div className="flexBetween">
                      <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-slate-200"><button className="p-1.5 bg-white text-cyan-950 rounded-full shadow-md"><FaCartPlus onClick={()=>increment(item._id,item.size)} className="cursor-pointer"/></button>
                      <p className="px-2">{item.quantity}</p>
                      <button className="p-1.5 bg-white text-gray-400 rounded-full shadow-md" onClick={()=>decrement(item._id,item.size)}><TbShoppingCartMinus className="text-slate-900 cursor-pointer" /></button></div>
                      <h4>{currency}{productData.price}</h4></div></div></div>
                      <hr className="mt-5" />
                      </div>
                    
            )
            
          })}</div>
            <div className="flex mt-8">
            <div className=" w-full sm:w-[450px]" >
              <CartTotal/>
              <button onClick={()=>navigate("/place-order")} className="bg-blue-950 rounded-lg w-[250px] h-[40px] text-white mt-10 hover:bg-sky-900 shadow-sm shadow-slate-500">Confirm Your Order</button>
            </div>
          </div></div></div>
        
    </section>
  )
}

export default Cart
