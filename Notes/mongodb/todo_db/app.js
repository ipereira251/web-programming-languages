import express, { json } from "express";
import Todorouter from "./routes/todoRoutes.js";
import mongoose from 'mongoose';
import session from 'express-session';

/* npm install mongoose
   npm install --save-dev nodemon */

const app = express();

app.use(session({
  secret: 'none',
  resave: false,
  saveUninitialized: false,
}));

app.use(json());

app.get('/', (req, res) => res.send("Login"));
app.get('/start', (req, res) => {
  req.session.user = "User's name"; //on a change, state change, begins session
  res.send("Hello user");
})
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