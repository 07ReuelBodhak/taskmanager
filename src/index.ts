//imports
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/middleware";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

//initialization
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_DB_URI as string;

//database
mongoose
  .connect(URI, {})
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("Error : ", err));

//functionality
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

//Modules
type User = {
  username: string;
  email: string;
};

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});

app.use(errorHandler);
