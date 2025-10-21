import express from 'express';

//npm install --save-dev nodemon, keeps from needing constant restart
//run with npm run dev
//node post.js in separate terminal

const app = express();
const port = 3000;

//make request message go through middleware with app.use
//parses json, convert to js object
app.use(express.json()); 

const tasks = [
  { id: 1, name: "Homework", completed: false },
  { id: 2, name: "Lunch", completed: false },
];

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/", (req, res) => { //localhost:3000/
  res.send("This is my app :)");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => { //cannot post from browser, use axios in post.js 
  tasks.push(req.body);
  console.log(req.body); //without middleware, reads as undefined
  console.log(tasks);
  //res.send()
});
