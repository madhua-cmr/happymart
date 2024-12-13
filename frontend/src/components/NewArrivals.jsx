import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"

import Item from "./Item"



const NewArrivals = () => {
    const {products} =useContext(ShopContext)
    const [newArrivals,setNewArrivals]=useState([])

    useEffect(()=>{
        if (products && products.length > 0) {
            const data = products.slice(0, 10); // Get the first 10 products
            setNewArrivals(data);}
    },[products])

  return (
   <section  className="max-padd-container py-16">
    <h2 className="text-center text-[18px] text-sky-950 font-bold capitalize p-3 pb-10">Fresh Arrivals</h2>
    <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">
        {newArrivals.map((product)=>(
           <div key={product._id}>
                <Item product={product}/>
             </div>
        )
        )}
    </div>
   </section>
  )
}

export default NewArrivals
