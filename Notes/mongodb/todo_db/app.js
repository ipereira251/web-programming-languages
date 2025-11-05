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
  saveUninitialized: false, //true: session starts on get, false: session starts on save
}));

app.use(json());

//something for /public for things not needing authentication

app.get('/', (req, res) => res.send("Login"));

app.get('/login', (req, res) => {
  //send a form
  res.send(`<form method="POST" action="/login"> 
    <input name="username" placeholder="Username" />
    <button>Login</button>
    </form>`);
});
                                      //simple structure
app.post('/login', express.urlencoded({extended: false}), (req, res) => {
  //url encoded object
  const username = req.body.username;
  //authentication here

  //session time!!
  req.session.user = {username};
  //send success, page redirect, etc
  res.redirect(req.session.redirectTo); //something's fishy here
  res.send("Successful login");
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
});

//middleware requires 3 params: req, res, next
function isAuthenticated(req, res, next){
  if(req.session.user)//if there is a user
    return next();
  //after successful login, return to previous page
  req.session.redirectTo = req.originalurl;
  res.redirect('/login');
}
//example:      app.get('/tasks', isAuthenticated, (req, res) => {})
//simpler way:  app.get('/tasks', isAuthenticated, Todorouter)

/*
app.get('/start', (req, res) => {
  req.session.user = "User's name"; //on a change, state creation, begins session
  res.send("Hello user");
});*/

app.use("/tasks",isAuthenticated, Todorouter);

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