import express from "express";
import { login, logOut, signIn } from "../controller/userController";
import { body } from "express-validator";

const router = express.Router();

router
  .post(
    "/signin",
    [
      body("username")
        .isLength({ min: 5 })
        .withMessage("username must be at least 5 character long"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 character long"),
      body("email").isEmail().withMessage("enter proper email"),
    ],
    signIn
  )
  .post("/login", login)
  .post("/logout", logOut);

export default router;
