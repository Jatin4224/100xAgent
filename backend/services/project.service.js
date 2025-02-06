import Project from "../models/project.model.js";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";
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

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Valid projectId is required");
  }
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Valid userId is required");
  }
  if (
    !Array.isArray(users) ||
    users.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    throw new Error("Users must be an array of valid user IDs");
  }

  const project = await Project.findOne({ _id: projectId, users: userId });
  if (!project) {
    throw new Error("User does not belong to this project");
  }

  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectId },
    { $addToSet: { users: { $each: users } } },
    { new: true }
  );

  return updatedProject;
};

export const getProjectByIdService = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  const project = await projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");

  return project;
};
