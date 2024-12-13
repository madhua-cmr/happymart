/* eslint-disable react/prop-types */
import { useState } from "react"
import upload from "../assets/upload.svg"
import {backend_url} from "../App"
import { toast } from "react-toastify";
import axios from "axios";
const AddProduct = ({token}) => {
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("Men");
    const [subCategory,setSubCategory]=useState("Topwear");
    const [popular,setPopular]=useState(false);
    const [sizes,setSizes]=useState([]);
    const [image1,setImage1]=useState("");
   
    const [image2,setImage2]=useState("");
    const [image3,setImage3]=useState("");
    const [image4,setImage4]=useState("");

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            const formData=new FormData();
            formData.append("name",name);
            formData.append("description",description);
            formData.append("price",price);

            formData.append("category",category);
            formData.append("subCategory",subCategory);
            formData.append("popular",popular);
            formData.append("sizes",JSON.stringify(sizes))
            image1&&formData.append("image1",image1);
            image2&&formData.append("image2",image2);
            image3&&formData.append("image3",image3);
            image4&&formData.append("image4",image4);
            
            const response =await axios.post(backend_url+"/api/product/add",
                formData,{headers:{token}}
            )
            
            if(response.data.success){
                toast.success(response.data.message);
                setName(""),
                setDescription(""),
                setImage1(""),
                setImage2(""),
             setSizes([]);
             setPopular(false)
                setImage3(""),
                setImage4(""),
                setPrice("")

            }
            else{
                toast.error(response.data.message);
            }
            
        }catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        

    }

  return (

    <form className="pl-8  " onSubmit={submitHandler} action="">
        <div className="flex  flex-col gap-y-2 ">
            <h3 className="text-[16px] font-semibold">Product Images</h3>
        <div className="flex gap-2 pt-2  ">
        <label htmlFor="image1" className="object-cover w-16 h-16 aspect-square">
        <img src={image1?URL.createObjectURL(image1):upload} alt="upload" />
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="image" id="image1" hidden />
          
        </label>
        <label htmlFor="image2"  className="object-cover w-16 h-16 aspect-square"> 
        <img src={image2?URL.createObjectURL(image2):upload} alt="upload" />
        <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  name="image" id="image2" hidden/>
          
        </label>
        <label htmlFor="image3"  className="object-cover w-16 h-16 aspect-square">
        <img src={image3?URL.createObjectURL(image3):upload} alt="upload" />
        <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  name="image" id="image3" hidden/>
          
        </label>
        <label htmlFor="image4"  className="object-cover w-16 h-16 aspect-square">
        <img src={image4?URL.createObjectURL(image4):upload} alt="upload" />
        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name="image" id="image4" hidden />
          
        </label>
        </div>
       
        <div className="mt-8">
            <h5 className="text-[16px]">Product Name</h5>
            <input value={name}onChange={(e)=>setName(e.target.value)}type="text" placeholder="Product name" className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded outline-none bg-white mt-1 w-[333px] "required/>
        </div>
        <div className="flex flex-col gap-1">
            <h5 className="text-[16px]">Product Description</h5>
            <textarea rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Write about the product.." className="px-3 py-1-5  outline-none ring-1 resize-none ring-slate-900/10 rounded bg-white mt-1 w-[333px] " required />
        </div>
        <div className="flex flex-col sm:flex-row gap-4  " >
            <div className=" flex flex-row gap-4 ">
                
                    <div >
                        <h5>Category</h5>
                        <select onChange={(e)=>setCategory(e.target.value)} name="category" value={category} className="max-w-28 px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded " required>
                        <option  value="Men">Men</option>
                        <option  value="Women">Women</option>
                        <option  value="Kids">Kids</option>

                        </select>
                    </div>
                    <div >
                        <h5>SubCategory</h5>
                        <select onChange={(e)=>setSubCategory(e.target.value)} name="subcategory" value={subCategory} className="max-w-28 px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded" required>
                        <option   value="Topwear">TopWear</option>
                        <option  value="Bottomwear">Bottomwear</option>
                        <option  value="Winterwear">Winterwear</option>
                        
                        </select>
                    
                </div>
           
            <div >
               <h5>Price</h5> 
               <input type="number" className=" border bg-white max-w-24  px-3 py-2 ring-1 ring-slate-900/5 h-[38px] rounded p-2 outline-none" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="10" required />

            </div>
            </div>
            </div>
            <div >
               <h5>Product Sizes</h5> 
               <div className="flex  gap-3 mt-2">
                <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])} className={`${sizes.includes("S")?"bg-blue-950 text-slate-100 !ring-black":"bg-white text-black"} rounded shadow-sm shadow-slate-500 ring-1 ring-slate-300 px-3 py-1 cursor-pointer`}><span className="p-2">S</span></div>
                <div  onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])} className={`${sizes.includes("M")?"bg-blue-950 text-slate-100 !ring-black":"bg-white text-black"} rounded shadow-sm shadow-slate-500 ring-1 ring-slate-300 px-3 py-1 cursor-pointer`}><span className="p-2">M</span></div>
                <div  onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])} className={`${sizes.includes("L")?"bg-blue-950 text-slate-100 !ring-black":"bg-white text-black"} rounded shadow-sm shadow-slate-500 ring-1 ring-slate-300 px-3 py-1 cursor-pointer`}><span className="p-2">L</span></div>
                <div  onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"])} className={`${sizes.includes("XL")?"bg-blue-950 text-slate-100 !ring-black":"bg-white text-black"} rounded shadow-sm shadow-slate-500 ring-1 ring-slate-300 px-3 py-1 cursor-pointer`}><span className="p-2">XL</span></div>
                <div  onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])} className={`${sizes.includes("XXL")?"bg-blue-950 text-slate-100 !ring-black":"bg-white text-black"} rounded shadow-sm shadow-slate-500 ring-1 ring-slate-300 px-3 py-1 cursor-pointer`}><span className="p-2">XXL</span></div>
               </div>

            </div>

       
        <div className="flex  gap-3 mb-2">
            <input onChange={()=>setPopular(prev =>!prev)} type="checkbox" checked={popular} id="popular"/>
            <label htmlFor="popular" className="cursor-pointer">Trending Product</label>
        </div>
        <button className=" p-3 rounded shadow-sm shadow-slate-400  max-w-44 bg-indigo-950 text-white">Create Product</button>
        </div>
    </form>
  
  )
}

export default AddProduct
