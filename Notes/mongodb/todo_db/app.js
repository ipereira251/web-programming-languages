import express, { json } from "express";
import Todorouter from "./routes/todoRoutes.js";
import mongoose from 'mongoose';

/* npm install mongoose
   npm install --save-dev nodemon */

const app = express();
app.use(json());

app.use("/tasks", Todorouter);

app.listen(3000, () => console.log("Server running on port 3000"));

mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://isabellapereira251_db_user:ucNNFXU1vFXzwMgO@cluster0.btgw66i.mongodb.net/"; //cluster uri
async function connectMongoose(){
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}

try{
  connectMongoose();
} catch (err){
  console.error("Failed to connect", err);
}