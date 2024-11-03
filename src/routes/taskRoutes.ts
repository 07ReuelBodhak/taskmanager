import express from "express";
import { authHandler } from "../middleware/middleware";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controller/taskController";

const router = express.Router();

router
  .route("/")
  .get(authHandler, getTask)
  .post(authHandler, createTask)
  .patch(authHandler, updateTask)
  .delete(authHandler, deleteTask);

export default router;
