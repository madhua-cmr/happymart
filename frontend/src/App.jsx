
import {Routes,Route} from "react-router-dom"
import Header from './components/Header'
import Home from "./pages/Home"
import  Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Verify from "./pages/Verify"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
  
    <main className="overflow-hidden bg-primary">
      < ToastContainer/>
      <Header/>
      <Routes>

       <Route path="/" element={<Home/>}/>
       <Route path="/collection" element={<Collection/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/products/:productId" element={<Product/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/place-order" element={<PlaceOrder/>}/>
       <Route path="/orders" element={<Orders/>}/>
       <Route path="/verify" element={<Verify/>}/>
 
       
      </Routes>
    </main>
    
  )
}

export default App
