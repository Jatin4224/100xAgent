import Project from "../models/project.model.js";
import projectModel from "../models/project.model.js";

export const createProjectService = async ({ name, userId }) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!userId) {
      throw new Error("User is required");
    }

    const project = await projectModel.create({
      name,
      users: [userId],
    });

    return project;
  } catch (error) {
    throw new Error(`Project creation failed: ${error.message}`);
  }
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const allUserProjects = await Project.find({ users: userId });

  return allUserProjects;
};
