import { Router } from "express";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;