import aboutImg from "../assets/about.jpg"
import { IoIosHappy } from "react-icons/io";
import { GiSelfLove } from "react-icons/gi";
const About = () => {
  const statistics=[
    {label:"Happy Customers",value:1000},
    {label:"Premium Products",value:29},
    {label:"Fresh Arrivals",value:7}
  ]
  return (
   <section>
    <div className="max-padd-container">
      <div className="max-padd-container py-10 bg-white rounded-2xl my-6 ">
        <div className="flex flex-col max-xl:items-center xl:flex-row gap-10">
         {/* left side */}
        <div className="flex-1 relative">
         
          <div className="  w-[488px] ">
            <img src={aboutImg} alt="about page" className="rounded-tl-full rounded-br-full " />
          </div>
          <div className="bg-white rounded-tr-full rounded-bl-lg rounded-tl-full absolute -bottom-12 left-10 max-w-xs p-4 rounded-2xl flexCenter flex-col shadow-md">
            <span className="bg-sky-950 rounded-full"><IoIosHappy className="text-sky-600 text-8xl" /></span>
            <p className="text-center " >HappyMart: Where Shopping Brings Joy</p>
          </div>
        </div>
        {/* right side */}
        <div className=" mt-5 flex-1 flex justify-center flex-col max-xl:items-center">
          <span className="medium-18 text-[#002D72]">Quality Service, Every Time.</span>
          <h2 className="h2 max-w-[472px] max-xl:max-w-[800px]">Our Promise: Quality, Convenience, and Value in Every Product.</h2>
          <p className="py-5 text-justify ">Welcome to HappyMart, your go-to destination for exclusive products, fresh arrivals, and unbeatable deals. As an engineering student with a passion for innovation, I created HappyMart to offer a seamless online shopping experience powered by technology.</p>
          {/* statistics */}
          <div className="flex flex-grid gap-4">
            {statistics.map((statistics,index)=>(
              
              <div key={index} className="bg-primary text-sky-400 rounded-lg">
                <div className="flex items-center gap-1 mx-2 mt-2">
                  <h3 className="h3 text-">{statistics.value}K</h3>
                  <h4 className="bold-22"><GiSelfLove /></h4>
                </div>
                <p className="text-sky-900 mb-2 mx-2">{statistics.label}</p>
                </div>
                ))}
          
          </div>
        </div>
        </div>
        </div>
        </div>
     
   </section>
  )
}

export default About
