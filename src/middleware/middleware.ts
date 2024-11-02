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

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({ Error: err.message || "An unexpected error occurred" });
};
