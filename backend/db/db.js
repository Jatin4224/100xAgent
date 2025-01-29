import mongoose from "mongoose";
import "dotenv/config.js";
function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectDb;
