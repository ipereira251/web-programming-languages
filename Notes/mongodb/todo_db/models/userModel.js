import mongoose from "mongoose";

//define schema
const userSchema = new mongoose.Schema (
  {
    id: {type: Number, required: true, min: 1},
    name: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
  }
);

//create model
export default mongoose.model('User', userSchema);