import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://tungocanh173_db_user:Vec8wCTD3gB6V5V8@cluster0.ckmiuue.mongodb.net/Questlix",
    )
    .then(() => {
      console.log("DB CONNECTED");
    });
};
