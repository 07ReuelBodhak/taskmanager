import { Request, Response, NextFunction } from "express";
import User, { Iuser } from "../models/User";

export const login = (req: Request, res: Response, next: NextFunction) => {};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    next(new Error("unable to create user"));
  }
};

export const logOut = (req: Request, res: Response) => {};
