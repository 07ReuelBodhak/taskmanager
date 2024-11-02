import { Request, Response, NextFunction } from "express";
import User, { Iuser } from "../models/User";
import { validationResult } from "express-validator";

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((er) => er.msg)
        .join(", ");

      const error = new Error(`Validation Error : ${errorMessage}`);
      return next(error);
    }
  } catch (err) {
    console.log(err);
    next(new Error("unable to create user"));
  }
};

export const logOut = (req: Request, res: Response) => {};
