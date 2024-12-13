/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {toast} from "react-toastify"
   import log from "../assets/loginp.jpg"   
   import sig from "../assets/sign.jpg"  
import { ShopContext } from "../context/ShopContext"


const Login = () => {
  const [currState,setCurrentState]=useState("login")
  const{token,setToken,getUserCart,backend_url,navigate}=useContext(ShopContext)
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const[email,setEmail]=useState('')
 const onSubmitHandler=async(e)=>{
e.preventDefault()
 try{
if(currState==="signup"){
const response=await axios.post(backend_url+"/api/user/register",{name,email,password})
if(response.data.success){
  setToken(response.data.token)
  localStorage.setItem('token',response.data.token)
}
else{
toast.error(response.data.message)
}
}else{
  const response=await axios.post(backend_url+"/api/user/login",{email,password})
  if(response.data.success){setToken(response.data.token)
    localStorage.setItem('token',response.data.token)
    

  }else{
    toast.error(response.data.message)
  }
}
}
 catch(err){
console.log(err)
toast.error(err.message)
 }
 }
 useEffect(()=>{
if(token){
  navigate("/")
  getUserCart(localStorage.getItem("token"))
}
 },[token])
  return (
    
    <section>
      <div className="max-padd-container">
        <div className="max-padd-container flex py-10 rounded-2xl my-16 bg-white max-xl:mt-8 ">
          <div className="flex flex-col sm:flex-col items-center justify-center m-auto  rounded-md ">
            <h2 className="h2">{currState==="login"?"Login":"Sign Up"}</h2>
            <form  onSubmit={onSubmitHandler} action="" className="flex justify-center p-6 gap-3 flex-1  flex-col ">
              {currState==="signup"&&(
              <div className="flex flex-col  ">
               <label htmlFor="name" className="text-[16px] font-semibold my-4 ">Name</label>
               <input  onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full p-2 outline-none rounded-md shadow bg-slate-100 " placeholder="Your Name" />
              </div>)
              } 
              <div className="flex flex-col w-full">
               <label htmlFor="email" className="text-[16px] font-semibold my-4 ">Email</label>
               <input type="text "  onChange={(e)=>setEmail(e.target.value)}  value={email} className="w-full p-2 outline-none rounded-md shadow bg-slate-100" placeholder="Your Email" />
              </div>
              <div className="flex flex-col w-full">
               <label htmlFor="password  " className="text-[16px] font-semibold my-4 ">Password</label>
               <input type="text"  onChange={(e)=>setPassword(e.target.value)}  value={password} className="w-full p-2 outline-none rounded-md  shadow bg-slate-100" placeholder="Your Password"/>
              </div>
              <button className="bg-neutral-950 mt-6 shadow-sm shadow-slate-600 hover:bg-sky-950 text-white text-sm  rounded-lg w-[300px] h-[40px] ">{currState==="login"?"Login":"Sign Up"}</button>
            </form>
            <div className="w-full p-6">
              <div className="">Forgot Password ? </div>
             {currState==="login"? <div className="">Don&apos;t have an account? <span onClick={()=>setCurrentState("signup")}> Create Account</span></div>:<div className="">Already have an account? <span onClick={()=>setCurrentState("login")}>Login</span></div>}
            </div>
          </div>
          <div className="w-1/2 max-h-[590px] hidden sm:block">
          {currState==="login"?
          <img src={log} alt="" className="object-cover h-full w-full rounded-md" />:
          <img src={sig} alt="" className="object-cover h-full w-full rounded-md " />
}</div>
        </div>
      </div>
    </section>
  )
}

export default Login
