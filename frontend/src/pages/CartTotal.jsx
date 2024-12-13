import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const CartTotal = () => {
    const {getCartAmount,delivery_charges,currency}=useContext(ShopContext)
  return (
    <div className="w-full" >
        <h1 className="text-[18px] text-sky-800 mb-6 font-semibold">Basket Total</h1>
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <h2>Total Amount:</h2>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
            <h2>Delivery Charge</h2>
            <p>{currency}{delivery_charges}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
            <h2>Final Amount</h2>
            <p>{currency}{getCartAmount()===0?0.00:getCartAmount()+delivery_charges}.00</p>
            </div>
            <hr />
            
        </div>
      
    </div>
  )
}

export default CartTotal
