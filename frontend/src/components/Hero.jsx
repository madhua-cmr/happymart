import { Link } from "react-router-dom"
import { FcApproval } from "react-icons/fc";
const Hero = () => {
  return (
    <section className="max-padd-container  max-lg:mt-8 mb-16" >
        <div className=" flex p-6 justify-end   bg-hero bg-cover bg-center bg-no-repeat h-[580px] w-full rounded-tl-3xl rounded-tr-3xl mt-6">
            <div className=" flex flex-col bg-transparent text-white w-3/10   justify-center"><h5 className='flex items-baseline gap-x-2 uppercase text-white medium-18'>Welcome to HappyMart - Where Smiles Meet Savings!<FcApproval /></h5>
            <h1 className="h1 capitalize max-w-[611px]">Shop Smart, Live Happy - Only at HappyMart!</h1>
            <p className="pl-2 max-w-lg mt-6 mb-8 border-l-4 border-l-sky-900"> Your ultimate shopping destination where happiness meets convenience. Explore a curated collection of top-quality products designed to make your life easier, brighter, and more joyful. From everyday essentials to unique finds, we&apos;ve got something for everyone. Let&apos;s make shopping a happy experience!</p>
           
            <div className="flex gap-2 sm:gap-6 mt-14">
                <Link className="btn-dark max-sm:!p-3">Trending Now</Link>
                <Link className="btn-secondary max-sm:!p-3">Best Sellers</Link>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
