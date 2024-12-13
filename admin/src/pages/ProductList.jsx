/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { backend_url } from "../App"
import axios from "axios"
import { toast } from "react-toastify"
import { FcFullTrash } from "react-icons/fc";
const ProductList = ({token}) => {
  const [list,setList]=useState([])

  const fetchList=async()=>{
    try {
      const response=await axios.get(backend_url+"/api/product/list")
       if(response.data.success){
        setList(response.data.products)
       }else{
        toast.error(response.data.message)
       }
    } catch(error){
      toast.error(error.message)
    }

  }
  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backend_url+'/api/product/remove',{id},{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
        
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(()=>{
  fetchList()
  },[])
  return (
    <div className="pl-8">
      <h2 className="text-[18px]">Available Products</h2>
      <div className="flex flex-col gap-2 pt-4">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 gap-4 border text-[14213d] bg-white font-semibold sm:font-bold rounded">
          <h3>Picture</h3>
          <h3>Name</h3>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Remove</h3>
        </div>
        {list.map((item)=>(
          <div key={item._id} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl">
            <img src={item.image[0]} alt=""  className="w-12 rounded-lg"/>
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <h3 className="text-sm font-semibold">{item.category}</h3>
            <div className="text-sm font-semibold">&#8377;{item.price}</div>
            <div>
            <FcFullTrash onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg"/>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
