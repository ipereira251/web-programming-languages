import { Router } from "express";
import { getTodos, addTodo, deleteTodo, updateTodo, getCompleted } from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.get("/completed", getCompleted);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;