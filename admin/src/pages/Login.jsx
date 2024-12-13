/* eslint-disable react/prop-types */
import { useState } from "react"
import log from "../assets/loginp.jpg"   
import axios from "axios"
import { toast } from "react-toastify";
import{backend_url} from "../App"
const Login = ({setToken}) => {
  
  const[email,setEmail]=useState('');
  const [password,setPassword]=useState('')

  const onSubmitHandler=async(e)=>{
try {
    e.preventDefault();
    const response=await axios.post(backend_url+'/api/user/admin',{email,password})
    if(response.data.success){
        setToken(response.data.token)
    }
    else{
        toast.error(response.data.message)
    }

} catch (error) {
    console.log(error);
  toast.error(error.message)
}
  }
  
  return (
    
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="flex w-full sm:w-1/2 items-center justify-center ">
          <div className="flex  flex-col  items-center w-[90%] sm:max-w-md m-auto gap-y-5 ">
            <h2 className="font-semibold text-[18px]">login</h2>
            <form action="" onSubmit={onSubmitHandler} className="flex justify-center p-6 gap-3 flex-1  flex-col ">
             
              <div className="flex flex-col w-full">
               <label htmlFor="email" className="text-[16px] font-semibold my-4 ">Email</label>
               <input onChange={(e)=>setEmail(e.target.value)} type="email " className="w-full p-2 outline-none rounded-md shadow bg-slate-100" placeholder="Your Email" required />
              </div>
              <div className="flex flex-col w-full">
               <label htmlFor="password  " className="text-[16px] font-semibold my-4 ">Password</label>
               <input type="text" onChange={ (e)=>setPassword(e.target.value)}className="w-full p-2 outline-none rounded-md  shadow bg-slate-100" placeholder="Your Password" required/>
              </div>
              <button type="submit" className="bg-neutral-950 mt-6 shadow-sm shadow-slate-600 hover:bg-sky-950 text-white text-sm  rounded-lg w-[300px] h-[40px] ">Login</button>
            </form>
            </div>
          </div>
          <div className="w-1/2 hidden sm:block">
          
          <img src={log} alt="" className="object-cover h-full w-full rounded-md" />
</div>
        
      </div>
    </section>
  )
}

export default Login
