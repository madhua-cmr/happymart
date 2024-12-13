/* eslint-disable react/prop-types */
import { FcAddImage } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const SideBar = ({token,setToken}) => {
  return (
    <div className=" flex sm:w-1/4 flex-row sm:h-[610px] h-[100px] items-center sm:flex-col justify-between p-4 font-bold bg-white ">
      <div className="flex flex-row justify-between items-center p-8  w-full  sm:h-full sm:flex-col ">
        <NavLink to={"/"}className={({isActive})=>`${isActive?"active-link":""} flex items-center w-full gap-2 justify-between`}>
          <h5 className="hidden sm:block text-[16px] ">Add Product</h5>
          <FcAddImage  className=" max-sm:block hidden md:block text-[26px]"/>
        </NavLink>
        <NavLink to={"/list"}className={({isActive})=>`${isActive?"active-link":""} gap-2 flex items-center w-full justify-between`}>
          <h5 className="hidden  sm:block">Products List</h5>
          <FcTodoList className=" max-sm:block hidden md:block text-[26px]" />
        </NavLink>
        <NavLink to={"/orders"}className={({isActive})=>`${isActive? "active-link" :""} flex items-center w-full justify-between`}>
          <h5 className="hidden sm:block"> Orders List</h5>
          <AiFillProduct  className=" max-sm:block hidden md:block text-[26px]"/>
        </NavLink>
      {token&&(
      <button onClick={()=>setToken("")}className="flex   m-2 p-4 sm:w-full  justify-between items-center">
        <h5 className="hidden sm:block">Logout</h5>
        <RiLogoutCircleRLine  className="text-[26px]"/>
      </button>
      )}
    </div>
    </div>

  );
};

export default SideBar;
