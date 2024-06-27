import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
    try {
        if (isConnected) { 
            console.log("Already Connected");
        } else {
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("Connected to database");
        }
        isConnected = true;
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
};

export default connectToDB;