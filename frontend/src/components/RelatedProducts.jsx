/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Item from "./Item"


const RelatedProducts = ({category,subCategory}) => {
    const {products}=useContext(ShopContext)
    const [related,setRelated]=useState([])
    useEffect(()=>{
        if(products.length>0){
            let filtered=products.slice()
            filtered=filtered.filter((item)=>category===item.category)
            filtered=filtered.filter((item)=>subCategory===item.subCategory)

            setRelated(filtered.slice(0,5))
        }
    },[products])
  return (
    <div className="max-padd-container py-16">
      <h2 className="font-bold text-[18px] mb-10 text-blue-950">Recommended for You
      </h2>
      <div className= "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related.map((product)=>(
            <Item product={product} key={product._id}/>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
