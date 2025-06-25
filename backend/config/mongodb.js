import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("mongodb 數據庫連線中"));
    await mongoose.connect(`${process.env.MONGO_URI}/mern-auth`);
};

export default connectDB;
