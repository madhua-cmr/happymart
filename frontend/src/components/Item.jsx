
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Item = ({product}) => {
  return (
    <div className="ring-1 p-2 m-2  ring-slate-900/5 rounded-xl bg-white overflow-hidden">
      <Link to={`/products/${product._id}`} className="flexCenter relative">
      <img src={product.image[0]} alt="pro image" className="w-[250px] object-cover aspect-square"/></Link>
      <div className="p-3 ">
        <h4 className="h4 line-clamp-1 text-cyan-800 font-semibold !my-0">
   {product.name}
        </h4>
        <div className="flexBetween pt-1">
            <p className="font-bold">{product.category}</p>
            <h5 className="h5 text-blue-700 pr-2">&#8377;{product.price}.00</h5>
        </div>
    
        <p className="line-clamp-2 py-1">{product.description}</p>
      </div>
    </div>
  )
}

export default Item
