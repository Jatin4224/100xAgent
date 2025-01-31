import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";

const userRouter = Router();

userRouter.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least length 3"),
  userController.createUserController
);

export default userRouter;
