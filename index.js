import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce").then(() => {
  console.log("Connected to DataBase");
});

app.use(express.json());

app.listen(3000, "127.0.0.1", () => {
  console.log("Server up and Running");
});
