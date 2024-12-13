import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-indigo-950 h-[100px] flex ">
      <Link to="/" className="text-white text-[25px] font-bold  w-full text-center my-auto ">HappyMart</Link>
    </header>
  )
}

export default Header
