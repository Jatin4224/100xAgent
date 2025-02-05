import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
import {
  createProjectService,
  getAllProjectByUserId,
} from "../services/project.service.js";

import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;

    const newProject = await createProjectService({ name, userId });

    res.status(201).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const allUserProjects = await getAllProjectByUserId({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      projects: allUserProjects,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
