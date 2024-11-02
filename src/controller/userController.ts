import { Request, Response, NextFunction } from "express";
import User, { Iuser } from "../models/User";
import { validationResult } from "express-validator";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401);
      next(new Error(`user with username ${username} not found`));
      return;
    }
    const match = await user?.isPasswordCorrect(password);
    if (!match) {
      res.status(401);
      next(new Error("Incorrect password"));
      return;
    }
    req.session.user = {
      username: user.username as string,
      email: user.email as string,
    };

    res.status(201).json({ message: "login successfully" });
  } catch (err) {
    console.log(err);
    next(new Error("unable to login"));
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((er) => er.msg)
        .join(", ");

      const error = new Error(`Validation Error : ${errorMessage}`);
      return next(error);
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    next(new Error("unable to create user"));
  }
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      next(new Error("Logout failed"));
      return;
    } else {
      res.status(200).json({ message: "logged out successfully" });
    }
  });
};
