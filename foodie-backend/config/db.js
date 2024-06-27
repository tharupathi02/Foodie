import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://foodie_user:k9IQhHQAkWWpXHN2@cluster0.t88hiox.mongodb.net/foodie"
    )
    .then(() => console.log("MongoDB is connected"));
};
