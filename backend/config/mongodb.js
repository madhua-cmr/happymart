import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDb connected to the host ${connection.connection.host}`);
    }catch(err){
        console.log(err);
    }
}

export default connectDB;