import { Link } from "react-router-dom"
import { MdPhoneAndroid } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="max-padd-container bg-black rounded-t-3xl pb-20 pt-5">
      <div className="p-5 flex max-xl:flex-col xl:justify-between text-white ">
        <div className=" max-xl:ml-2 max-xl:!max-w-[1000px] max-w-[350px] ">
            <h1 className=" text-[20px] mb-5 font-bold text-sky-300">HappyMart</h1>
            <h3 className="mb-3 ] ">HappyMart is your one-stop shop for the best deals and a wide variety of products, delivered straight to your doorstep. Shop with confidence and convenience!</h3>
            <p className="text-slate-400">&copy; 2024 HappyMart. All rights reserved.</p>
        </div>
        <div className="flex flex-col mx-2 gap-2">
            <h2 className=" mt-5 text-[16px] font-bold">Useful Links</h2>
            <Link to="/about" >Our Story</Link>
            <Link to="/collection">Explore Products</Link>
            <a href="/#feature">Our Features</a>
            <Link to="/contact">Get in Touch</Link>
            <Link to="/about">Privacy Statement</Link>

        </div>
        <div className=" mt-5 flex flex-col mx-2 gap-2">
            <h2 className="text-[16px] font-bold">Talk to Us</h2>
            <p className="inline-flex items-center gap-2"> <MdPhoneAndroid className="text-[25px]" />+91 84384387757</p>
            <p className="inline-flex items-center gap-2 "><MdOutlineMailOutline className="text-[25px]"/>support@happymart.com</p>
            <p className="inline-flex items-center gap-2"><LiaMapMarkedAltSolid  className="text-[25px]"/>Main road,Chinnamanur,Thenidt - 625515</p>
        </div>
        <div className=" mt-5 flex flex-col gap-4 mx-2">
            <h2 className="text-[16px] font-bold">Follow Our Socials</h2>
            <div className="flex gap-4 mt-2">
                 <a href="https://www.instagram.com/madhumitha_a/" className="text-2xl text-white"><FaInstagram /></a>
            <a href="https://www.facebook.com/share/19d9x97C3T/" className="text-2xl text-white"><CiFacebook /></a>
            <a href="https://www.linkedin.com/in/madhumitha-a-b30ba5252" className="text-2xl text-white"><AiOutlineLinkedin /></a>
            <a href="" className="text-2xl text-white"><FaXTwitter /></a> 
        </div></div>
      </div>
    </div>
  )
}

export default Footer
