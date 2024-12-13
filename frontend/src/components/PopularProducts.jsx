import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "./Item"

const PopularProducts = () => {
    const {products} =useContext(ShopContext)
  const[popularProducts,setPopularProducts]=useState([])

    useEffect(()=>{
        const data=products.filter(item=>item.popular)
        setPopularProducts(data.slice(0,5))
    },[products])
  return (
   <section  className="max-padd-container py-16">
    <h2 className="text-center text-[18px] font-bold text-cyan-950 p-5 mb-5">Trending Products</h2>
    <div className="grid grid-cols-1 xs-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {popularProducts.map(product=>(
            <div key={product._id}>
                <Item product={product}/>
                </div>
))}
    </div>
   </section>
  )
}

export default PopularProducts
