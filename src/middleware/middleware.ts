import { Request, Response, NextFunction } from "express";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  next();
};
