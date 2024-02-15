import mongoose from "mongoose";
mongoose.set('strictQuery', true);


const connection = async () => {
    return await mongoose.connect(process.env.DBconnection)
        .then(() => {
            console.log("Database connected");
        }).catch(() => {
            console.log("Database error");
        })
}

export default connection;