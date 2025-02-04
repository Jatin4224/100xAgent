import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleWare from "../middleware/auth.middleware.js";
const projectRouter = Router();

projectRouter.post(
  "/create",
  authMiddleWare.authUser,
  body("name").isString().withMessage("Name is Required"),
  projectController.createProject
);

export default projectRouter;
