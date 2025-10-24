import express from 'express';

//npm install --save-dev nodemon, keeps from needing constant restart
//run with npm run dev
//node post.js in separate terminal

const app = express();
const port = 3000;

//make request message go through middleware with app.use
//parses json, convert to js object
app.use(express.json()); 

//middleware should: execute code, modify req/res, end the req/res cycle, call next middleware in stack
//run in order they're written
/* app.use('/user/:id', (req, res, next) => {
    ....
    next()
  }), (req, res, next) => {
    ......
    next()  
  }  */

var tasks = [
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
  const newTask = {...req.body};
  tasks.push(newTask); //safer than tasks.push(req.body), req object could be modified by others after push
  console.log(req.body); //without middleware, reads as undefined
  console.log(tasks);
  res.send("Cool, thanks");
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter( task => task.id != id);
  res.json({Message: "Task deleted."});

});

//to modify a specific task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if(!task) return res.status(404).json({error: "Not found."});
  task.name = req.body.name;
  task.completed = req.body.completed;
  res.json(task);
});

//no routes found
app.use((req, res) => {
  res.sendStatus(404);
})

/* Model-View-Controller (MVC) pattern
  Model: defines data structure
  View: controls display
  Controller: defines control flows 
  
  Model manipulates view
  View sends input to Controller
  Controller sometimes updates View directly
  Controller manipulates Model

  todo_express
  |-Controllers
  |  |-TodoController
  |-Models
  |  |-TodoModel
  |-Views
  |  |-ToDoViews
  |-Router
 */