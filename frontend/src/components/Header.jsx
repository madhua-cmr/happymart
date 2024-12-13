import { Link} from "react-router-dom"
import Navbar from "./Navbar"
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useContext, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { RiUserHeartFill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { ShopContext } from "../context/ShopContext";
const Header = () => {
    const{setShowSearch,setCartItems,getCartCount,navigate,token,setToken}=useContext(ShopContext)
    const[menuOpened,setMenuOpened]=useState(false);

    const toggleMenu=()=>{
        setMenuOpened((prev)=>!prev)
    }
    const logout=()=>{
        setCartItems({})
        localStorage.removeItem('token');
        setToken('')
       
        navigate('/login')
       
    }
  return (
  <header className="py-5 w-full bg-sky-950">
   <div className="max-padd-container flexBetween">
    <Link to={"/"}  className="bold-24 flex-1 xl:hidden">
    <h4 className=" shadow-sm text-white h-28 w-28 px-2 absolute top-5 rounded-full ">HappyMart</h4>
    </Link>
    <div className="flex-1">
    <Navbar menuOpened={menuOpened} toggleMenu={toggleMenu} containerStyles={`${menuOpened?"flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl":"hidden xl:flex  gap-x-8 text-white medium-15 rounded-full px-2 py-1"}`}/>
    </div>
    <Link to={"/"}  className="bold-24 flex-1 hidden xl:flex">
    <h4 className=" shadow-sm text-white h-28 w-28 px-2 absolute top-5 rounded-full ">HappyMart</h4>
    </Link>


    <div className="flexBetween gap-x-10 xs:gap-x-20">
        {!menuOpened&&(<CgMenu onClick={toggleMenu} className=" text-white xl:hidden cursor-pointer text-2xl"/>)}
        <div><FaSearch onClick={()=>setShowSearch((prev)=>!prev)}className="text-xl text-white cursor-pointer" /></div>
        <Link to ={'/cart'} className="flex relative">
        <PiShoppingBagOpenFill className="  text-white text-[25px]"/>
        <span className="bg-blue-400 text-white absolute right-0.5 -top-3 flexCenter w-5 h-5 rounded-full   shadow-inner">{getCartCount()}</span></Link>
        <div className="group relative ">
            <div onClick={()=>!token&&navigate('/login')}>
            <RiUserHeartFill  className=" text-white text-2xl cursor-pointer"/>
            </div>
            {token&&<>
            <ul className="bg-white shadow-sm p-3 w-32 ring-1 ring-slate-900/15 rounded  right-0 hidden group-hover:flex flex-col absolute"><li onClick={()=>navigate('/orders')} className="flexBetween cursor-pointer"><p>Orders
                </p>
                <FaArrowRight className="text-[19px] cursor-pointer opacity-50" />
                </li><hr className="my-2" />
            <li onClick={logout} className="flexBetween cursor-pointer"><p>Logout</p>
            <FaArrowRightFromBracket  className="text-[19px] cursor-pointer opacity-50"/>
            </li></ul></>}
        </div>
    </div>
   </div>
  </header>
  )
}

export default Header
