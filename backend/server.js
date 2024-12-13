import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import cartroutes from "./routes/cartRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoute from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
const app=express()
const port=process.env.PORT||4000

connectDB()


app.use(express.json())
app.use(cors())




app.use("/api/user",userRoutes);
app.use("/api/product",productRoute);
app.use("/api/cart",cartroutes)
app.use("/api/order",orderRoutes)

app.listen(port,()=>{
    console.log(`Server listening to the port ${port} `);

})