/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import SideBar from "./pages/SideBar";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend_url=import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"")


  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])
  return (
    <main>
      <ToastContainer/>
      {token===""?( <Login setToken={setToken}/>):(
     
      <div className="bg-primary text-black">
        <Header/>
        <div className="flex flex-col sm:flex-row mt-8 sm:mt-4">
          <SideBar token={token} setToken={setToken}/>
          <Routes>
            <Route path="/" element={<AddProduct token={token}/>}/>
            <Route path="/list" element={<ProductList token={token}/>}/>
            <Route path="/orders" element={<Orders token={token}/>}/>

          </Routes>
        </div>
      </div>
      )}
    </main>
  )
}
