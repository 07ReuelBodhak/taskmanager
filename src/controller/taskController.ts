import { Request, Response, NextFunction } from "express";
import TaskModel, { TSK } from "../models/Task";

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await TaskModel.find({ user: req.body.user });
    if (!tasks || tasks.length === 0) {
      res.status(200).json({ message: "No tasks created yet" });
      return;
    }
    res.status(200).json({ data: tasks });
  } catch (er) {
    console.log(er);
    return next(new Error("Error while getting tasks"));
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, dueDate, user } = req.body;
  try {
    const task = new TaskModel({
      title,
      created: new TaskModel().formatDate(),
      dueDate,
      description,
      user,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (er) {
    console.log(er);
    res.status(500);
    return next(new Error("Error while creating task"));
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateTask = await TaskModel.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateTask) {
      res.status(404).json({ message: "task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updateTask });
  } catch (er) {
    console.log(er);
    return next(new Error("Error while updating task"));
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskToDelete = await TaskModel.findByIdAndDelete(req.body.id);
    if (!taskToDelete) {
      res.status(404).json({ message: "task not found" });
      return;
    }
    res.status(201).json({ message: "task deleted successfully" });
  } catch (er) {
    console.log(er);
    return next(new Error("Error while updating task"));
  }
};
