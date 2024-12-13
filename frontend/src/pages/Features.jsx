import { RiDiscountPercentFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa";

import { BsCashCoin } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
const Features = () => {
  return (
    <section className="max-padd-container mb-14">
        <h2 className="text-center text-[18px] font-bold  ">Our Promise</h2>
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 xs:grid-col-2 gap-8 max-padd-container m-10">
            
            <div className="bg-white p-6 ring-1 ring-slate-100 shadow-md rounded-md"><RiDiscountPercentFill />
                <h2>Exclusive Discounts</h2>
                <p>Enjoy amazing discounts on selected products. Shop now and save big!</p>
            </div>
            <div className="bg-white p-6 ring-1 ring-slate-100 shadow-md rounded-md "><FaGift />
                <h2>Free Gifts and Coupons</h2>
                <p>Get exciting free gifts with every purchase. Limited-time offer!</p>
            </div>
            <div className="bg-white p-6 ring-1 ring-slate-100 shadow-md rounded-md">
            <GiReturnArrow />
                <h2> Easy Return</h2>
                <p>Return any product within 30 days with no questions asked. Shopping made easy!</p>
            </div>
            <div className="bg-white p-6 ring-1 ring-slate-100 shadow-md rounded-md "><BsCashCoin />
                <h2> Cash on Delivery</h2>
                <p>Pay when your order is delivered to your doorstep for convenience and security.</p>
            </div>
            </div>
        
    </section>
  )
}

export default Features
