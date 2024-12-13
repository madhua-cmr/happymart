
import { FcHome } from "react-icons/fc";
import { PiDresser } from "react-icons/pi";
import { FcContacts } from "react-icons/fc";
import { FcCloseUpMode } from "react-icons/fc";
import { TbHexagonLetterWFilled } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
const Navbar = ({containerStyles,toggleMenu,menuOpened}) => {

  const navItems=[
    {to:"/",label:"Home",icon:<FcHome />},
    {to:"/collection",label:"Collections",icon:<PiDresser className=" text-black xl:text-white  "/>},
    {to:"/about",label:"About us",icon:<TbHexagonLetterWFilled className="text-black xl:text-white"/>},
    {to:"/mailto:support@happymart.com",label:"Contact",icon:<FcContacts />}
  ]
  
  
  return (
   <nav className={containerStyles}>
    {menuOpened&&(
      <>
 <FcCloseUpMode onClick={toggleMenu} className="text-2xl self-end cursor-pointer relative left-8 text-blue-900" />
 
 <Link to={'/'} className="bold-24 mb-10">
  <h4 className="text-blue-950">HappyMart</h4>
 </Link>
 </>
    )}
      
      {navItems.map(({to,label,icon})=>(
        <div key={label} className='inline-flex'>
          <NavLink to={to} className={({isActive})=>
          isActive?"active-link flexCenter gap-x-2 ":"flexCenter gap-x-2"} onClick={menuOpened&&toggleMenu}>
          {icon}
          <h5 className="medium-16">{label}</h5></NavLink>
        </div>
      ))}
   
   </nav>
  )
}

export default Navbar
