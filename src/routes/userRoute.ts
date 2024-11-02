import express from "express";
import { login, logOut, signIn } from "../controller/userController";

const router = express.Router();

router.route("/").post(signIn).post(login).post(logOut);
