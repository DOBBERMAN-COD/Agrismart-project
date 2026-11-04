import mongoose from "mongoose";

async function connectDB() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/agrismart");

        console.log("MongoDB connected successfully");
    } catch(error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

export default connectDB;