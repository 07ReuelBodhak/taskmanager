//imports
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import { authHandler } from "./middleware/middleware";

dotenv.config();

//initialization
const app = express();
const PORT = process.env.PORT || 3000;

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
  id: string;
  email: string;
};

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

app.use(authHandler);

app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
