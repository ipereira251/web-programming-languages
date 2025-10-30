import Todo from '../models/todoModel.js' //importing model

export async function getTodos(req, res) {
  const todos = await Todo.findById(req.body);
  res.json(todos);
};

export async function getCompleted(req, res) {
  const completed = await Todo.find({completed: true});
  res.json(completed);
}

export async function addTodo (req, res) {
  try{
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch(err){
    res.status(400).json({error: err.message});
  }
  
};

export function deleteTodo (req, res) {
 
};

export async function updateTodo (req, res) {
  //assume schema id
  try{
    const id = req.params.id;
    const updated = await Todo.findByIdAndUpdate(id, req.body);
    res.status(201).json(updated); //convention: return old value
  } catch (err){
    res.status(400).json(err.message);
  }
  
};