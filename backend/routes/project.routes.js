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

projectRouter.get(
  "/all",
  authMiddleWare.authUser,
  projectController.getAllProject
);

projectRouter.put(
  "/add-user",
  authMiddleWare.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);

projectRouter.get(
  "/get-project/:projectId",
  authMiddleWare.authUser,
  projectController.getProjectById
);

export default projectRouter;
