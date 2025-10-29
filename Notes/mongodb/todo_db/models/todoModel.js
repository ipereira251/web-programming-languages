/*const todos = [
  { id: 1, name: "Eat", completed: false },
  { id: 2, name: "Sleep", completed: false },
];*/

import mongoose from "mongoose";

//define schema
const todoSchema = new mongoose.Schema (
  {
    id: {type: Number, required: true, min: 1},
    name: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
  }
);

//create model
export default mongoose.model('Todo', todoSchema);