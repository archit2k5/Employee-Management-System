import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch(errro){
        console.error("Mongo Connection Error");
        process.exit(1);
    }
}