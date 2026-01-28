import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, getAllTask);
taskRouter.post("/", authMiddleware, createTask);
taskRouter.get("/:id", authMiddleware, getTaskById);
taskRouter.put("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id", authMiddleware, deleteTask);

export default taskRouter;
