import Footer from "../components/Footer"
import Hero from "../components/Hero"
import NewArrivals from "../components/NewArrivals"
import PopularProducts from "../components/PopularProducts"
import Features from "./Features"


const Home = () => {
  return (
    <div>
     <Hero/>
     
     <NewArrivals/>
     <PopularProducts/>
     <Features/>
     <Footer/>
    </div>
  )
}

export default Home
