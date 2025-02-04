import projectModel from "../models/project.model.js";

const createProject = async ({ name, userId }) => {
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

export default createProject;
