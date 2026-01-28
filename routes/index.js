import authRouter from "./authRoutes.js";
import taskRouter from "./taskRoutes.js";
import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);

export default router;
